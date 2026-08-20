const PROJECT_PASSWORD = "mxs@cc355";
const ACCESS_COOKIE = "portfolio_access";

async function accessToken(path: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(PROJECT_PASSWORD), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`melissa-shi-portfolio-access:${path}`));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function passwordPage(path: string, showError = false) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Protected case study | Melissa Shi</title>
  <link rel="icon" href="/portfolio/portfolio-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{color-scheme:light;--pink:#fef1ff;--purple:#a74ef7;--purple-dark:#7832b5;--ink:#17121d;--muted:#665e6b;--line:#eadff0}
    *{box-sizing:border-box}body{min-height:100dvh;margin:0;display:grid;place-items:center;padding:32px 20px;background:var(--pink);color:var(--ink);font-family:"Nunito Sans","Segoe UI",sans-serif}
    main{width:min(100%,520px);padding:clamp(28px,6vw,52px);background:#fff;border:1px solid rgba(167,78,247,.13);border-radius:28px;box-shadow:0 18px 55px rgba(77,33,110,.1)}
    .brand{display:inline-flex;align-items:center;gap:10px;color:var(--ink);font-family:"Fredoka",sans-serif;font-weight:700;text-decoration:none}.brand img{width:44px;height:44px;border-radius:50%;object-fit:contain}
    h1{margin:38px 0 14px;font-family:"Fredoka",sans-serif;font-size:clamp(2.2rem,8vw,3.35rem);line-height:1.02;letter-spacing:-.035em}p{margin:0;color:var(--muted);line-height:1.65}
    form{margin-top:30px}label{display:block;margin-bottom:9px;font-weight:800}input{width:100%;height:54px;padding:0 17px;border:2px solid var(--line);border-radius:16px;background:#fff;color:var(--ink);font:inherit}input:focus{border-color:var(--purple);outline:4px solid rgba(167,78,247,.2)}
    .error{margin:10px 0 0;color:#a12646;font-weight:700}.actions{display:flex;align-items:center;gap:12px;margin-top:22px}button,.cancel{min-height:50px;display:inline-flex;align-items:center;justify-content:center;padding:0 24px;border:2px solid var(--purple);border-radius:999px;font:800 1rem "Nunito Sans",sans-serif;text-decoration:none;cursor:pointer}button{background:var(--purple);color:#fff;box-shadow:0 10px 24px rgba(167,78,247,.22)}button:hover{background:var(--purple-dark);border-color:var(--purple-dark)}.cancel{background:#fff;color:var(--ink)}.cancel:hover{background:var(--pink);color:var(--purple-dark)}
    .contact{margin-top:30px;padding-top:24px;border-top:1px solid var(--line);font-size:.94rem}.contact a{color:var(--purple-dark);font-weight:800;text-underline-offset:3px}button:focus-visible,.cancel:focus-visible,.brand:focus-visible,.contact a:focus-visible{outline:4px solid rgba(167,78,247,.35);outline-offset:4px}
    @media(max-width:480px){main{padding:28px 22px;border-radius:24px}.actions{align-items:stretch;flex-direction:column}button,.cancel{width:100%}}
  </style>
</head>
<body>
  <main>
    <a class="brand" href="/"><img src="/portfolio/portfolio-logo.png" alt=""><span>Melissa Shi</span></a>
    <h1>Enter password to view this case study</h1>
    <p>This work is password protected.</p>
    <form action="${path}" method="post">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required autofocus${showError ? ' aria-invalid="true" aria-describedby="password-error"' : ""}>
      ${showError ? '<p class="error" id="password-error" role="alert">That password isn&#39;t correct. Please try again.</p>' : ""}
      <div class="actions"><button type="submit">Access</button><a class="cancel" href="/">Cancel</a></div>
    </form>
    <p class="contact">Contact me for password: <a href="mailto:melissa.x.shi@gmail.com">melissa.x.shi@gmail.com</a></p>
  </main>
</body>
</html>`, { status: 401, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export async function passwordGate(request: Request) {
  const url = new URL(request.url);
  const token = await accessToken(url.pathname);
  const hasAccess = (request.headers.get("cookie") ?? "").split(";").some((part) => {
    const [name, value] = part.trim().split("=", 2);
    return name === ACCESS_COOKIE && value === token;
  });
  if (hasAccess) return null;
  if (request.method === "POST") {
    const form = await request.formData();
    if (form.get("password") === PROJECT_PASSWORD) {
      return new Response(null, { status: 303, headers: { location: url.href, "set-cookie": `${ACCESS_COOKIE}=${token}; Path=${url.pathname}; HttpOnly; Secure; SameSite=Lax` } });
    }
    return passwordPage(url.pathname, true);
  }
  return passwordPage(url.pathname);
}
