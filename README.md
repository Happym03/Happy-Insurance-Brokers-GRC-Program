# Risk Assessment & GRC Program — Happy Insurance Brokers (Portfolio Project)

[![Live Dashboard](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://happym03.github.io/Happy-Insurance-Brokers-GRC-Program/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An end-to-end Governance, Risk, and Compliance (GRC) program and real-time interactive executive dashboard built for a fictional short-term insurance brokerage — **Happy Insurance Brokers (Pty) Ltd**. The project covers risk assessment, ISO 27001 alignment, governance structure, regulatory compliance, vendor risk, business continuity, incident response, and web-based executive reporting.

It demonstrates the complete, end-to-end GRC workflow required of a GRC or Compliance Analyst role, rather than isolated documentation deliverables.

---

## 🚀 Live Interactive Dashboard
Experience the live web dashboard: **[https://happym03.github.io/Happy-Insurance-Brokers-GRC-Program/](https://happym03.github.io/Happy-Insurance-Brokers-GRC-Program/)**

---

## 🏢 Context & Scope

- **Fictional Entity:** Happy Insurance Brokers (Pty) Ltd — a mid-sized, single-site Financial Services Provider (FSP) authorised under FAIS, handling client PII, insurance advice, and premium/claims payments.
- **Regulatory Frameworks:** Aligned with South African regulatory requirements (**FAIS**, **POPIA**, **TCF**) alongside global standards (**ISO/IEC 27001:2022**, **NIST CSF**, **PCI DSS**, **GDPR**).

---

## 💡 Why This Project?

Risk registers, gap assessments, and treatment plans are core, everyday deliverables in Compliance and GRC roles — but a real GRC function is more than a single document. It requires governance (decision-making authority), a board-approved risk appetite (the logic behind risk ratings), an inventory of assets, and operational response procedures. 

This project builds that complete ecosystem: **20 interlocking documentation artifacts** and an **interactive JSON-driven web dashboard** that all trace back to the same core risk register and ISO 27001 control baseline.

---

## 📁 Repository Structure

```text
├── continuity-response/            # Business Continuity (BIA) and Incident Response playbooks
├── data/                           # Asynchronous JSON models powering the web dashboard
│   ├── compliance.json             # Framework compliance scores
│   ├── controls.json               # Control implementation & effectiveness status
│   ├── findings.json               # Audit findings & remediation lifecycle
│   ├── risks.json                  # Enterprise risk scoring data
│   └── vendors.json                # TPRM vendor registers
├── governance/                     # Board risk appetite statement & governance charter
├── iso27001-compliance/            # ISO 27001 gap assessment, roadmap & core security policies
├── registers/                      # Asset inventory and control mapping registers
├── reporting/                      # Internal audit report & executive metrics
├── risk-assessment/               # Master risk assessment report, matrix & treatment plan
├── screenshots/                    # Dashboard UI preview assets
├── vendor-risk/                    # Third-Party Risk Management (TPRM) assessments
├── index.html                      # Single-page web application interface
├── script.js                       # Dynamic fetch API logic, routing & interactive filtering
├── style.css                       # Responsive executive dashboard styling
└── README.md                       # Master project documentation
