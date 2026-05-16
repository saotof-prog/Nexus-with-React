import { useEffect, useState } from 'react'

export default function Verify() {
  const [status, setStatus] = useState('loading')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const verifyToken = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (!token) {
        setStatus('error')
        setError('Token manquant')
        return
      }

      try {
        const response = await fetch(`/api/auth/verify/${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setUser(data.user)
          localStorage.setItem('authToken', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
        } else {
          setStatus('error')
          setError(data.error || 'Vérification échouée')
        }
      } catch (err) {
        setStatus('error')
        setError('Erreur de connexion au serveur')
        console.error(err)
      }
    }

    verifyToken()
  }, [])

  return (
    <div className="min-h-svh flex items-center justify-center bg-slate-950">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="glass rounded-2xl border border-cyan-400/20 p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin inline-block w-8 h-8 border-2 border-cyan-400 border-r-transparent rounded-full mb-4" />
              <p className="text-slate-400">Vérification en cours...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-2">Email vérifié !</h2>
              <p className="text-slate-400 mb-6">
                Bienvenue {user?.email}. Vous avez accès à NEXUS.
              </p>
              <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-4 mb-6">
                <p className="text-xs text-cyan-300 font-mono break-all">
                  Token JWT sauvegardé localement
                </p>
              </div>
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-2 px-6 rounded transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              >
                Retour à l'accueil
              </a>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-4xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-white mb-2">Vérification échouée</h2>
              <p className="text-amber-400 mb-6">{error}</p>
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold py-2 px-6 rounded transition hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
              >
                Retour à l'accueil
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
