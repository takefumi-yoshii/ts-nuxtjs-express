# ts-nuxtjs-express

型定義だけで、Nuxt x Vuex の TypeScript 課題を解決する方法論を示すサンプルコードです。

## どこまで推論が効いているのか

まずはどれほど型が効いているか確認です。
体験してみて、良さそうならキャスト方まで読み進めてください。

### 1.Store Module での推論を確認する

`store/counter/index.ts` を確認します。getter関数を見てください。
試しに、すべての引数を追加してみます。
`double(state, getters, rootState, rootGetters)`

各関数はなにもキャストしていませんが、全ての引数に型が完全に行き渡っていることが確認できます。

### 2.SFC での推論を確認する

`components/AppCounter.vue` の推論を、VSCodeで確認します。
`this.$store.getters['']` まで入力したところ、
`this.$store.dispatch('')` まで入力したところで入力補完が確認できます。

getter関数は戻り型が、action関数は payload が推論されていることが確認できます。

### 3.Context の推論を確認する

`middleware/index.ts` の `ctx` 推論を確認します。
SFC と同様に、ctx.store.dispatch が payload まで推論が確認できます。
ctx.req.session が、express-session 提供の型がキャストされていることが確認できます。

___

## どうやって定義するのか

実装にあたり、なにを定義する必要があるのか説明します。

### 1.Store Module の型を定義する

`store/counter/type.ts` に型定義があります。
これは `store/counter/index.ts` と、root キャストに利用する型定義です。

|型名称|概要|
|:-:|:-:|
|interface S|State の型定義です。|
|interface G|Getters に向けた定義です。**getter関数の戻り型をあらかじめ interface で定義します。**|
|interface RG|SFC や rootGetters で、文字列から型参照するための定義です。参照エイリアスを、ここで合成します。|
|interface M|Mutations に向けた定義です。**payloadの型をあらかじめ interface で定義します。**|
|interface RM|Mutation Typeから、payload型を参照するための定義です。参照エイリアスを、ここで合成します。|
|interface A|Actions に向けた定義です。**payloadの型をあらかじめ interface で定義します。**|
|interface RA|Action Typeから、payload型を参照するための定義です。参照エイリアスを、ここで合成します。|

文字列エイリアス（名前空間）は、Vuex が自動で付与するものと同じものをキャストします。

### 2.Store Module にキャストして実装する

`store/counter/index.ts` は見てのとおり、アノテーションがほとんどありません。
`Getters<S, G>`・`Mutations<S, M>`・`Actions<S, A, G, M>` で**全てがキャストされます。**

G・M・A 型で型宣言している関数と比較し、**過不足がある場合、コンパイルエラーになります。**
Store Module 内部の定義は以上です。

### 3.型定義を集約する

SFC や rootXXX に向けて、どんな Module が定義されているのか、
`types/vuex/impl.ts` で vuex に型定義を教え込みます。
`RootState` は、Tree構造にしたがってキャストします。
`RootGetters`・`RootMutations`・`RootActions` は、`&` で繋ぐだけです。

### 4.SFC に型定義を教え込んだ Store をキャストする

`components/AppCounter.vue` を確認します。
`$store!: Vuex.ExStore` がキャストしている箇所です。
これがあることで、`this.$store` から型参照が可能になります。

各関数のインラインキャストは一切不要です。

___

mapHelper 系は依然として推論は届きません。
これについては、引き続き探求する予定です。

