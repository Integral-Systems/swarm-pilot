{{#success build.status}}
✅  Production-Deploy #{{build.number}} of `{{repo.name}}` succeeded.

💾  Commit by {{commit.author}} on `{{commit.branch}}`:
#️⃣  ``Commit:`` `{{truncate commit.sha 8}}`
🏷️  ``Tag:`` `{{build.tag}}`
💬  ``Message:``
`{{commit.message}} `

🔗  {{ build.link }}
{{else}} ❌
Production-Deploy #{{build.number}} of `{{repo.name}}` failed.

💾 Commit by {{commit.author}} on `{{commit.branch}}`:
🏷️ ``Tag: `` `{{build.tag}}`
💬 ``Message:``
`{{commit.message}} `

🔗  {{ build.link }}
{{/success}}
