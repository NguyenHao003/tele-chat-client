import { Eye, EyeOff, MessageCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/enums/routes'
import { getApiErrorMessage } from '@/helpers/api-error'
import { getAccessToken } from '@/helpers/auth-token'
import { useLogin } from '@/modules/auth/hooks/use-login'
import { useRegister } from '@/modules/auth/hooks/use-register'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const accessToken = getAccessToken()
  const location = useLocation()
  const from = (location.state as { from?: Location } | null)?.from?.pathname

  const {
    error: loginError,
    isPending: isLoginPending,
    login,
  } = useLogin()
  const {
    error: registerError,
    isPending: isRegisterPending,
    register,
  } = useRegister()

  const isRegister = mode === 'register'
  const error = loginError ?? registerError
  const errorMessage = error ? getApiErrorMessage(error) : null
  const isPending = isLoginPending || isRegisterPending

  if (accessToken) {
    return <Navigate replace to={from ?? ROUTES.CHAT} />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    const username = String(formData.get('username') ?? '')

    if (isRegister) {
      register(
        { email, password, username },
        {
          onSuccess: () => {
            login({ email, password })
          },
        },
      )
      return
    }

    login({ email, password })
  }

  return (
    <main className='grid min-h-svh place-items-center bg-[radial-gradient(circle_at_top_left,oklch(0.92_0.05_210),transparent_34%),linear-gradient(135deg,oklch(0.99_0.004_240),oklch(0.94_0.018_250))] px-4'>
      <section className='w-full max-w-[420px] rounded-xl border border-white/70 bg-card/95 p-7 shadow-[0_24px_70px_rgba(15,40,80,0.14)] backdrop-blur'>
        <div className='mb-7 flex items-center gap-3'>
          <div className='grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm'>
            <MessageCircle className='size-5' />
          </div>
          <div>
            <h1 className='text-xl font-semibold tracking-tight'>Tele Chat</h1>
            <p className='text-sm text-muted-foreground'>
              Đăng nhập để tiếp tục trò chuyện
            </p>
          </div>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit}>
          {isRegister ? (
            <label className='block space-y-2'>
              <span className='text-sm font-medium'>Username</span>
              <input
                className='h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-primary/10'
                name='username'
                required
              />
            </label>
          ) : null}

          <label className='block space-y-2'>
            <span className='text-sm font-medium'>Email</span>
            <input
              className='h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-primary/10'
              name='email'
              required
              type='email'
            />
          </label>

          <label className='block space-y-2'>
            <span className='text-sm font-medium'>Password</span>
            <div className='relative'>
              <input
                className='h-11 w-full rounded-lg border border-input bg-background px-3 pr-11 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-primary/10'
                minLength={6}
                name='password'
                required
                type={showPassword ? 'text' : 'password'}
              />
              <button
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className='absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground'
                onClick={() => setShowPassword((value) => !value)}
                type='button'
              >
                {showPassword ? (
                  <EyeOff className='size-4' />
                ) : (
                  <Eye className='size-4' />
                )}
              </button>
            </div>
          </label>

          {errorMessage ? (
            <p className='text-sm text-red-600'>{errorMessage}</p>
          ) : null}

          <Button
            className='h-11 w-full rounded-lg'
            disabled={isPending}
            type='submit'
          >
            {isPending ? 'Đang xử lý...' : isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </Button>
        </form>

        <button
          className='mt-5 w-full text-center text-sm font-medium text-muted-foreground transition hover:text-foreground'
          onClick={() => setMode(isRegister ? 'login' : 'register')}
          type='button'
        >
          {isRegister
            ? 'Đã có tài khoản? Đăng nhập'
            : 'Chưa có tài khoản? Đăng ký'}
        </button>
      </section>
    </main>
  )
}
