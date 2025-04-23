{{#success build.status}}
✅  Stage-Build #{{build.number}} of `{{repo.name}}` succeeded.

💾  Commit by {{commit.author}} on `{{commit.branch}}`:
#️⃣  ``Commit:`` `{{truncate commit.sha 8}}`
🏷️  ``Tag:`` `{{build.tag}}`
💬  ``Message:``
`{{commit.message}} `

🔗  {{ build.link }}
{{else}} ❌
Stage-Build #{{build.number}} of `{{repo.name}}` failed.

💾  Commit by {{commit.author}} on `{{commit.branch}}`:
🏷️  ``Tag: `` `{{build.tag}}`
💬  ``Message:``
`{{commit.message}} `

🔗  {{ build.link }}
{{/success}}
