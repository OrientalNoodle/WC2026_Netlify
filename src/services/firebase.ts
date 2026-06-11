import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'REPLACE_WITH_YOUR_AUTH_DOMAIN',
  projectId: 'REPLACE_WITH_YOUR_PROJECT_ID'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function useAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Google sign-in failed', error)
    })
  }

  const signOut = () => {
    firebaseSignOut(auth).catch((error) => {
      console.error('Sign-out failed', error)
    })
  }

  return { user, signIn, signOut }
}
