import base64
s=open('index.src.html').read()
logo='data:image/webp;base64,'+base64.b64encode(open('logo.webp','rb').read()).decode()
body='data:image/webp;base64,'+base64.b64encode(open('body.webp','rb').read()).decode()
s=s.replace('__LOGO__',logo).replace('__BODY__',body)
open('index.html','w').write(s)
open('preview.html','w').write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><link rel="icon" href="data:,"></head><body>'+s+'</body></html>')
print(len(s))
