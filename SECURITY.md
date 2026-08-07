# Security Policy

## Reporting a Vulnerability

If you find a security vulnerability, please do not open a public issue. Instead, please email **calcuttanode@gmail.com** with details about the vulnerability and steps to reproduce it.

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.0 | Yes |

## Security Best Practices

- **Never commit secrets:** Ensure `.env` files and any credentials are never committed to the repository. Use `.env.example`.
- **Keep dependencies updated:** Regularly run `npm audit` to check for vulnerabilities in dependencies.
- **Use secure environment variables:** Configure sensitive keys in your hosting platform (Render/Vercel) rather than hardcoding them.
- **Do not hardcode paths:** Avoid using absolute local paths (like `D:\...`) in code, as they are insecure and non-portable.
