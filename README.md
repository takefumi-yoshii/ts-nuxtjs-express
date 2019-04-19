# ts-nuxtjs-express

型定義だけで、Nuxt x Vuex の TypeScript 型課題を解決する方法論を示す、サンプルリポジトリです。  
型推論のために特別なモジュールを追加する必要はありません。  

## どこまで型推論が効いているのか

まずはどれほど型が効いているか、VSCode で確認してきましょう。  
体験してみて、良さそうなら「どうやって定義するのか」まで読み進めてください。  

### 1.Store Module での推論を確認する

`store/counter/index.ts` を確認します。getter関数を見てください。  

試しに、`double`関数に、すべての引数を追加してみます。  
`double(state, getters, rootState, rootGetters)`  

各関数はなにもキャストしていませんが、全ての引数に型が完全に行き渡っていることが確認できます。

### 2.SFC での推論を確認する

`components/AppCounter.vue` の推論を確認します。  

`this.$store.getters['']` まで入力したところで入力補完が確認できます。  
getter関数は戻り型まで推論が適用されています。  

`this.$store.dispatch('')` まで入力したところで入力補完が確認できます。  
第一引数を入力すると、対応する payload 型が推論されていることが確認できます。  

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
|---|---|
|interface S|State の型定義です。|
|interface G|Getters に向けた定義です。**getter関数の戻り型をあらかじめ interface で定義します。**|
|interface RG|SFC や rootGetters で、文字列から型参照するための定義です。参照エイリアスを、ここで合成します。|
|interface M|Mutations に向けた定義です。**payloadの型をあらかじめ interface で定義します。**|
|interface RM|Mutation Typeから、payload型を参照するための定義です。参照エイリアスを、ここで合成します。|
|interface A|Actions に向けた定義です。**payloadの型をあらかじめ interface で定義します。**|
|interface RA|Action Typeから、payload型を参照するための定義です。参照エイリアスを、ここで合成します。|

`RG`・`RM`・`RA` は名前空間マッピングと呼んでおり、文字列参照をマッピングする定義です。  
Vuex が自動で付与する名前空間を、正しく教えこみます。  

### 2.Store Module にキャストして実装する

`store/counter/index.ts` は見てのとおり、アノテーションがほとんどありません。  
`Getters<S, G>`・`Mutations<S, M>`・`Actions<S, A, G, M>` で**全てがキャストされます。**  
関数ごとのアノテーションは、引数も含めて付与する必要はありません。  

G・M・A 型で型宣言している関数と比較し、**過不足がある場合、コンパイルエラーになります。**  
Store Module 内部の定義は以上です。

### 3.型定義を集約する

SFC や rootXXX に向けて、どんな Module が定義されているのか、  
`types/vuex/impl.ts` で **Vuex に型定義を教え込みます。**  

#### 【RootState】

`RootState` は、Tree構造にしたがってキャストします。 
たとえば、つぎの様な Tree構造の定義があったとします。  

```
├── counter
│   ├── type.ts
│   └── index.ts
├── type.ts
├── index.ts
└── todos
    ├── type.ts
    ├── index.ts
    └── nest
        ├── type.ts
        └── index.ts
```

これを正しく教えこむためには、次の様に指定します。

```typescript
type RootState = Root.S & {
  counter: Counter.S
  todos: Todos.S & {
    nest: TodosNest.S
  }
}
```

#### 【その他】

`RootGetters`・`RootMutations`・`RootActions` は、`&` で繋ぐだけです。
「3.型定義を集約する」は「ライブラリに定義を教え込む」キャストといえます。
**この工程を忘れてしまうと、型参照はできないので注意してください。**

### 4.SFC に型定義を教え込んだ Store をキャストする

`components/AppCounter.vue` を確認します。  
`$store!: Vuex.ExStore` がキャストしている箇所です。  
これがあることで、`this.$store` から型参照が可能になります。

各関数のインラインキャストは一切不要です。

___

SFC の推論が遅延する場合があります。  
そんな時は、VSCode を再起動してください。  

mapHelper 系は依然として推論は届きません。  
これについては、引き続き探求する予定です。

