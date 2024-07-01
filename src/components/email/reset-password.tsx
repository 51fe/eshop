import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import { site } from '@/config'
import { absoluteUrl } from '@/lib/utils'

interface ResetPasswordEmailProps {
  email: string
  token: string
}

export function ResetPasswordEmail({ email, token }: ResetPasswordEmailProps) {
  const previewText = `${site.name} password reset.`

  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Hi,</Text>
              <Text className="text-base">
                Someone just requested a password change for your {site.name}{' '}
                account associated with {email}.
              </Text>
              <Text className="text-base">
                If this was you, you can set a new password here:
              </Text>
              <Button
                href={absoluteUrl(`/login/password-update?token=${token}`)}
              >
                Set new password
              </Button>
            </Section>
            <Section>
              <Text className="text-xs">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-xs">
                To keep your account secure, please don&apos;t forward this
                email to anyone.
              </Text>
            </Section>
            <Section>
              <Text className="text-base font-medium">
                Enjoy{' '}
                <span className="font-semibold tracking-wide">{site.name}</span>{' '}
                and have a nice day!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
