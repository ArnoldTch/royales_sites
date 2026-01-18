const { exec } = require("child_process")
const fs = require("fs")

exec("npm audit --json", (error, stdout) => {
  const report = JSON.parse(stdout)

  const summary = {
    date: new Date().toISOString(),
    total: report.metadata.vulnerabilities.total,
    critical: report.metadata.vulnerabilities.critical,
    high: report.metadata.vulnerabilities.high,
    moderate: report.metadata.vulnerabilities.moderate,
    low: report.metadata.vulnerabilities.low,
  }

  fs.writeFileSync(
    "dependency-monitoring.json",
    JSON.stringify(summary, null, 2)
  )

  if (summary.critical > 0 || summary.high > 0) {
    console.error("Vulnérabilités critiques détectées")
    process.exit(1)
  }

  console.log("Dépendances OK", summary)
})
