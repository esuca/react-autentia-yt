import React from 'react'
import { Input } from './Input'
import { MyButton } from './Button'

export function Password() {
  const [showPassword, setShowPassword] = React.useState(false)

  function togglePasswordVisibility() {
    setShowPassword((showPassword) => !showPassword)
  }

  return (
    <div>
      <label htmlFor="password">Password</label>
      <Input id="password" type={showPassword ? 'text' : 'password'} />
      <MyButton onClick={togglePasswordVisibility}>Show/Hide</MyButton>
    </div>
  )
}
