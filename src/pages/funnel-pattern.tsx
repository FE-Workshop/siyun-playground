import { useState } from 'react'
import { useForm } from 'react-hook-form'

import useFunnel from '../hooks/use-funnel'

import MobileLayout from '../components/mobile-layout'
import Header from '../components/header'
import InputLabel from '../components/input-label'
import Button from '../components/button'
import Info from '../components/info'
import Footer from '../components/footer'
import Main from '../components/main'

const FunnelPattern = () => {
  const STEPS = [
    'signUp',
    'name',
    'phone',
    'residentRegistrationNumber',
    'address',
    'preview',
    'complete',
  ]
  const { register, handleSubmit } = useForm()
  const { Funnel, onNext, onPrev } = useFunnel(STEPS)
  const [registerData, setRegisterData] = useState({
    last_name: '',
    first_name: '',
    phone: '',
    resident_registration_number: '',
    address: '',
  })

  const validate = (fieldName: string, value: string) => {
    const phoneRegex = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/

    let isError = false
    let message = ''

    switch (fieldName) {
      case 'first_name':
        if (!value) {
          isError = true
        } else {
          isError = false
        }
        break
      case 'last_name':
        if (!value) {
          isError = true
        } else {
          isError = false
        }
        break
      case 'phone':
        if (!value) {
          isError = true
        } else if (!phoneRegex.test(value)) {
          isError = true
          message = '올바르지 않은 휴대폰 번호입니다.'
        } else {
          isError = false
        }
        break
      default:
        break
    }

    return { isError, message }
  }

  const handelNext = (data) => {
    setRegisterData((prev) => ({ ...prev, ...data }))
    onNext()
  }

  return (
    <MobileLayout>
      <form>
        <Funnel>
          <Funnel.Step name='signUp'>
            <Header />

            <Main>
              <div className='h-full flex justify-center'>
                <span className='font-bold flex items-center'>
                  회원가입하기
                </span>
              </div>
            </Main>

            <Footer>
              <Button onClick={handleSubmit(handelNext)}>회원가입</Button>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='name'>
            <Header label='이름 입력' progressPercent='20%' />
            <Main>
              <div className='mt-[20px] mb-[50px] '>
                <div className='font-bold text-xl'>이름을 입력해주세요</div>
              </div>

              <div className='flex flex-col gap-10'>
                <InputLabel
                  label='성'
                  item='last_name'
                  placeholder='성을 입력해 주세요'
                  register={register}
                />

                <InputLabel
                  label='이름'
                  item='first_name'
                  placeholder='이름을 입력해 주세요'
                  register={register}
                />
              </div>
            </Main>

            <Footer>
              <Button onClick={handleSubmit(handelNext)}>다음</Button>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='phone'>
            <Header label='휴대폰 번호 입력' progressPercent='40%' />

            <Main>
              <div className='mt-[20px] mb-[50px] '>
                <div className='font-bold text-xl'>
                  휴대폰 번호를 입력해주세요
                </div>
              </div>

              <InputLabel
                label='휴대폰 번호'
                item='phone'
                placeholder='휴대폰 번호를 입력해 주세요'
                register={register}
                error={validate('phone', registerData.phone).message}
              />
            </Main>

            <Footer>
              <div className='flex gap-2'>
                <Button width='80px' variant='white' onClick={onPrev}>
                  ←
                </Button>
                <Button width='260px' onClick={handleSubmit(handelNext)}>
                  다음
                </Button>
              </div>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='residentRegistrationNumber'>
            <Header label='주민등록번호 입력' progressPercent='60%' />

            <Main>
              <div className='mt-[20px] mb-[50px] '>
                <div className='font-bold text-xl'>
                  주민등록번호를 입력해주세요
                </div>
              </div>

              <InputLabel
                label='주민등록번호'
                item='resident_registration_number'
                placeholder='주민등록번호를 입력해 주세요'
                register={register}
              />
            </Main>

            <Footer>
              <div className='flex gap-2'>
                <Button width='80px' variant='white' onClick={onPrev}>
                  ←
                </Button>
                <Button width='260px' onClick={handleSubmit(handelNext)}>
                  다음
                </Button>
              </div>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='address'>
            <Header label='주소 입력' progressPercent='80%' />

            <Main>
              <div className='mt-[20px] mb-[50px] '>
                <div className='font-bold text-xl'>주소를 입력해주세요</div>
              </div>

              <InputLabel
                label='주소'
                item='address'
                placeholder='주소를 입력해 주세요'
                register={register}
              />
            </Main>

            <Footer>
              <div className='flex gap-2'>
                <Button width='80px' variant='white' onClick={onPrev}>
                  ←
                </Button>
                <Button width='260px' onClick={handleSubmit(handelNext)}>
                  다음
                </Button>
              </div>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='preview'>
            <Header
              label='입력된 정보를 확인해 주세요'
              progressPercent='100%'
            />

            <Main>
              <div className='mt-[20px] mb-[50px] '>
                <div className='font-bold text-xl'>
                  입력된 정보를 확인해 주세요
                </div>
              </div>

              <div className='flex flex-col gap-8'>
                <Info
                  label='이름'
                  info={[
                    { label: '성', value: registerData.last_name },
                    { label: '이름', value: registerData.last_name },
                  ]}
                />

                <Info
                  label='주민등록번호'
                  info={[
                    {
                      label: '주민등록번호',
                      value: registerData.resident_registration_number,
                    },
                  ]}
                />

                <Info
                  label='휴대폰 번호'
                  info={[
                    {
                      label: '휴대폰 번호',
                      value: registerData.phone,
                    },
                  ]}
                />

                <Info
                  label='주소'
                  info={[
                    {
                      label: '주소',
                      value: registerData.address,
                    },
                  ]}
                />
              </div>
            </Main>

            <Footer>
              <div className='flex gap-2'>
                <Button width='80px' variant='white' onClick={onPrev}>
                  ←
                </Button>
                <Button width='260px' onClick={handleSubmit(handelNext)}>
                  제출하기
                </Button>
              </div>
            </Footer>
          </Funnel.Step>

          <Funnel.Step name='complete'>
            <Header />

            <Main>
              <div className='flex justify-center h-full items-center'>
                <div className='flex flex-col '>
                  <div className='text-6xl'>🎉</div>
                  <div className='font-bold mt-[20px]'>가입 완료</div>
                </div>
              </div>
            </Main>
          </Funnel.Step>
        </Funnel>
      </form>
    </MobileLayout>
  )
}

export default FunnelPattern
