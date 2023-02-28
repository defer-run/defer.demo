export const schema = gql`
  type Query {
    helloWorld: String! @skipAuth
  }
`
