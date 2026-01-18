@startuml Royales Festival - Class Diagram

package "Frontend (Next.js/React)" {
  
  class HomePage {
    - videoRef: RefObject
    - currentIndex: number
    - isFading: boolean
    - isPlaying: boolean
    + handleEnded(): void
    + togglePlayPause(): void
    + render(): JSX.Element
  }
  
  class LineupPage {
    - activeIndex: number
    - isImageVisible: boolean
    + toggleArtist(index: number): void
    + render(): JSX.Element
  }
  
  class InfoPage {
    + render(): JSX.Element
  }
  
  class ContactsPage {
    - isSelectOpen: boolean
    - selectedOption: string
    - email: string
    - message: string
    - isLoading: boolean
    - statusMessage: string
    - statusType: string
    + handleSubmit(): Promise<void>
    + render(): JSX.Element
  }
  
  class Artist {
    + name: string
    + image: string
    + description: string
  }
  
  LineupPage "1" *-- "6" Artist : contient
}

package "Backend (Node.js/Express)" {
  
  class Server {
    - app: Express
    - port: number
    + start(): void
    + setupMiddleware(): void
    + setupRoutes(): void
  }
  
  class ContactRouter {
    + post(req, res): Promise<Response>
    - validateData(data): boolean
  }
  
  class EmailService {
    - transporter: Transporter
    + sendEmailToAdmin(data): Promise<void>
    + sendConfirmationToUser(email, objet): Promise<void>
    - createTransporter(): Transporter
  }
  
  class MailOptions {
    + from: string
    + to: string
    + subject: string
    + html: string
  }
  
  Server "1" --> "1" ContactRouter : utilise
  ContactRouter "1" --> "1" EmailService : utilise
  EmailService "1" ..> "2" MailOptions : crée
}

' ===== EXTERNAL SERVICES =====
package "Services Externes" {
  class GmailSMTP {
    + host: string
    + port: number
    + auth: Object
    + sendMail(options): Promise<void>
  }
  
  class GoogleFonts {
    + family: string
    + getFont(): string
  }
}

EmailService --> GmailSMTP : utilise
HomePage --> GoogleFonts : utilise
LineupPage --> GoogleFonts : utilise
InfoPage --> GoogleFonts : utilise
ContactsPage --> GoogleFonts : utilise

' ===== COMMUNICATION =====
ContactsPage ..> ContactRouter : HTTP POST /api/contact
ContactRouter ..> ContactsPage : Response JSON

@enduml