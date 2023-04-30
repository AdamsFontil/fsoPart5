const SignUpForm = ({ handleCreateUser, name, setName, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleCreateUser}>
      <div>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign up</button>
    </form>
  )
}

export default SignUpForm
