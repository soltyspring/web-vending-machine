# 백엔드 작업 지시서: 계정 찾기 및 비밀번호 재설정

## 목적

아이디 찾기, 이메일 찾기, 비밀번호 재설정 기능을 구현한다.
개인정보 보호를 위해 인증 전에는 아이디와 이메일을 일부 마스킹하여 반환하고, 이메일 인증이 완료된 경우에만 전체 아이디 확인 또는 비밀번호 재설정이 가능하도록 한다.

## 공통 메시지

프론트엔드와 동일한 메시지를 반환한다.

```text
아이디를 찾았습니다.
이메일을 찾았습니다.
인증코드를 이메일로 발송했습니다.
인증이 완료되었습니다.
비밀번호가 재설정되었습니다.
가입된 계정을 찾을 수 없습니다.
이메일 형식이 올바르지 않습니다.
인증코드가 올바르지 않습니다.
인증코드가 만료되었습니다.
새 비밀번호 형식이 올바르지 않습니다.
잠시 후 다시 시도해 주세요.
```

## 마스킹 정책

### 아이디 마스킹

`mask_username(username)` 유틸 함수를 만든다.

- 아이디 길이가 3글자 미만이면 앞 1글자만 노출하고 나머지는 `*` 처리한다.
- 아이디 길이가 5글자 미만이면 앞 3글자만 노출하고 나머지는 `*` 처리한다.
- 아이디 길이가 7글자 이상이면 앞 5글자만 노출하고 나머지는 `*` 처리한다.
- 아이디 길이가 5~6글자이면 앞 3글자만 노출하고 나머지는 `*` 처리한다.

예시:

```text
ab      -> a*
abcd    -> abc*
abcdef  -> abc***
abcdefg -> abcde**
```

### 이메일 마스킹

`mask_email(email)` 유틸 함수를 만든다.

- 이메일의 `@` 앞 로컬 파트만 아이디 마스킹 기준과 동일하게 처리한다.
- 이메일 도메인은 전체 공개한다.

예시:

```text
ab@test.com       -> a*@test.com
abcd@test.com     -> abc*@test.com
abcdef@test.com   -> abc***@test.com
abcdefg@gmail.com -> abcde**@gmail.com
```

## API 1: 아이디 일부 찾기

### Endpoint

```http
POST /api/auth/find-username
```

### Request

```json
{
  "email": "user@example.com"
}
```

### 처리 흐름

- 이메일 형식을 검증한다.
- 해당 이메일로 가입된 사용자를 조회한다.
- 사용자가 없으면 `"가입된 계정을 찾을 수 없습니다."`를 반환한다.
- 사용자가 있으면 마스킹된 username을 반환한다.

### Response

```json
{
  "message": "아이디를 찾았습니다.",
  "maskedUsername": "abcde**"
}
```

## API 2: 아이디 전체 확인용 인증코드 발송

### Endpoint

```http
POST /api/auth/send-find-username-code
```

### Request

```json
{
  "email": "user@example.com"
}
```

### 처리 흐름

- 이메일 형식을 검증한다.
- 가입된 이메일인지 확인한다.
- 가입되지 않은 이메일이면 `"가입된 계정을 찾을 수 없습니다."`를 반환한다.
- 가입된 이메일이면 인증코드를 생성하고 이메일로 발송한다.
- 인증코드는 만료 시간을 가진다.

### Response

```json
{
  "message": "인증코드를 이메일로 발송했습니다."
}
```

## API 3: 아이디 전체 확인용 인증코드 검증

### Endpoint

```http
POST /api/auth/verify-find-username-code
```

### Request

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

### 처리 흐름

- 이메일과 인증코드를 검증한다.
- 인증코드가 틀리면 `"인증코드가 올바르지 않습니다."`를 반환한다.
- 인증코드가 만료되었으면 `"인증코드가 만료되었습니다."`를 반환한다.
- 인증 성공 시 전체 username을 반환한다.

### Response

```json
{
  "message": "인증이 완료되었습니다.",
  "username": "abcdefg"
}
```

## API 4: 이메일 찾기

### Endpoint

```http
POST /api/auth/find-email
```

### Request

```json
{
  "username": "abcdefg"
}
```

### 처리 흐름

- username으로 가입된 사용자를 조회한다.
- 사용자가 없으면 `"가입된 계정을 찾을 수 없습니다."`를 반환한다.
- 사용자가 있으면 마스킹된 이메일을 반환한다.
- 이메일 도메인은 전체 공개한다.

### Response

```json
{
  "message": "이메일을 찾았습니다.",
  "maskedEmail": "abcde**@gmail.com"
}
```

## API 5: 비밀번호 재설정 인증코드 발송

### Endpoint

```http
POST /api/auth/send-password-reset-code
```

### Request

```json
{
  "email": "user@example.com"
}
```

### 처리 흐름

- 이메일 형식을 검증한다.
- 가입된 이메일인지 확인한다.
- 가입되지 않은 이메일이면 `"가입된 계정을 찾을 수 없습니다."`를 반환한다.
- 가입된 이메일이면 인증코드를 발송한다.

### Response

```json
{
  "message": "인증코드를 이메일로 발송했습니다."
}
```

## API 6: 비밀번호 재설정 인증코드 검증

### Endpoint

```http
POST /api/auth/verify-password-reset-code
```

### Request

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

### 처리 흐름

- 이메일과 인증코드를 검증한다.
- 인증코드가 틀리면 `"인증코드가 올바르지 않습니다."`를 반환한다.
- 인증코드가 만료되었으면 `"인증코드가 만료되었습니다."`를 반환한다.
- 인증 성공 시 비밀번호 재설정용 `resetToken`을 발급한다.
- `resetToken`은 짧은 만료 시간을 가진다.
- `resetToken` 구현이 어렵다면 서버에 인증 완료 상태를 저장하고 일정 시간 내 재설정만 허용한다.

### Response

```json
{
  "message": "인증이 완료되었습니다.",
  "resetToken": "temporary-reset-token"
}
```

## API 7: 비밀번호 재설정

### Endpoint

```http
POST /api/auth/reset-password
```

### Request

```json
{
  "email": "user@example.com",
  "resetToken": "temporary-reset-token",
  "newPassword": "Newpass123!"
}
```

### 처리 흐름

- `resetToken` 또는 인증 완료 상태를 확인한다.
- 새 비밀번호 형식을 검증한다.
- 비밀번호는 기존 회원가입 정책과 동일하게 검증한다.
- 비밀번호는 해시 처리 후 `users.password_hash`에 저장한다.
- 재설정 성공 후 인증코드와 토큰은 재사용되지 않도록 만료 처리한다.

### Response

```json
{
  "message": "비밀번호가 재설정되었습니다."
}
```

## 보안 주의사항

- 기존 비밀번호는 절대 조회하거나 반환하지 않는다.
- 인증 전에는 아이디 전체 또는 이메일 전체를 반환하지 않는다.
- 아이디 전체 확인은 이메일 인증 성공 후에만 허용한다.
- 이메일 찾기는 인증 없이 마스킹된 이메일만 반환한다.
- 인증코드와 resetToken은 만료 시간이 있어야 한다.
- 인증 성공 후 사용한 인증코드와 resetToken은 재사용할 수 없어야 한다.
- DB 오류, SMTP 오류 등 예상하지 못한 오류는 `"잠시 후 다시 시도해 주세요."`로 통일한다.
