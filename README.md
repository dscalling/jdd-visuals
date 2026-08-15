# JDD Visuals – professionelle Kunden-Website

Eine deutschsprachige, responsive One-Page-Website für **JDD Visuals**.

## Besonders einfach zu bearbeiten

Fast alle Inhalte liegen in **`config.js`**:

- Firmenname und Slogan
- E-Mail / Instagram
- Hero-Texte
- Leistungen
- Arbeitsablauf
- Referenzen
- Zahlen
- FAQ

Du musst für normale Textänderungen **nicht** in `index.html` oder `style.css` suchen.

## Logo austauschen

Ersetze `assets/jdd-visuals-logo.png` durch dein eigenes Logo/Bild und behalte den Dateinamen.

## Auf GitHub Pages veröffentlichen

1. Neues Repository erstellen, z. B. `jdd-visuals`.
2. Alle Dateien dieses Pakets hochladen.
3. GitHub → **Settings → Pages**.
4. **Deploy from a branch** auswählen.
5. Branch `main` und Ordner `/ (root)` auswählen.
6. Speichern.

## Wichtig vor dem Livegang

Ersetze in `config.js` unbedingt:
- `hello@jdd-visuals.de`
- `@jddvisuals`
- alle Beispiel-Referenzen
- Texte, die noch nicht zu euren echten Leistungen passen

Danach ist die Seite bereit für GitHub Pages.


## Neue Bereiche

- FAQ ist jetzt auf- und zuklappbar.
- Impressum und Datenschutz sind integriert.
- Cookie-Hinweis mit Auswahl ist integriert.
- Projektanfrage mit Name, Telefonnummer, E-Mail, gewünschter Leistung und Beschreibung.
- Die Website richtet sich ausdrücklich nicht nur an Marken: Unternehmen, Creator, Vereine, Projekte, Selbstständige, Privatpersonen usw.
- Vor dem Livegang unbedingt echte Impressums-/Datenschutzangaben und Kontaktdaten einsetzen. Die rechtlichen Pflichtangaben sollten für eure konkrete Situation geprüft werden.

## Browser-Logo (Favicon)
Das JDD-Logo ist jetzt als Favicon eingebaut und erscheint neben „JDD Visuals“ im Browser-Tab.


## Bewertungsmenü

Die Website enthält jetzt ein einfaches Bewertungsmenü:
- Name ist Pflicht.
- 1–5 Sterne können ausgewählt werden.
- Ein Kommentar ist optional.
- Keine Registrierung und keine E-Mail nötig.

**Wichtig:** Da die Website als reine GitHub-Pages-Seite ohne Server-Backend läuft, werden diese Bewertungen aktuell nur im jeweiligen Browser (`localStorage`) gespeichert. Wenn echte Bewertungen für **alle Besucher** sichtbar und dauerhaft gespeichert werden sollen, braucht ihr später einen kleinen Backend-/Datenbankdienst.


## Anfrageformular ohne E-Mail-App

Das Projektformular verwendet in dieser Version **FormSubmit**. Dadurch wird die Anfrage direkt online an `hello@jdd-visuals.de` übermittelt, ohne dass beim Kunden Outlook, Gmail oder eine andere Mail-App geöffnet wird.

**Einmalige Aktivierung:** Beim ersten Absenden muss die Zieladresse bei FormSubmit bestätigt werden. Danach kann das Formular normal verwendet werden.

Wenn ihr keinen externen Formularanbieter nutzen möchtet, braucht ihr stattdessen ein eigenes Backend oder einen Serverless-Dienst, weil GitHub Pages selbst keine Formulardaten serverseitig verarbeitet.


## Branded Bestätigungsseite & Antwort-E-Mail

Nach dem Absenden wird der Kunde jetzt auf eine eigene `thanks.html` weitergeleitet, die im JDD-Visuals-Stil gestaltet ist.

Zusätzlich versendet FormSubmit eine automatische Antwort an die vom Kunden eingetragene E-Mail-Adresse. Der Inhalt ist als JDD-Visuals-Dankesnachricht hinterlegt.

**Wichtig:** FormSubmit erlaubt laut aktueller Dokumentation eigene `_next`-Dankeseiten und eine `_autoresponse`-Nachricht; für die E-Mail selbst stehen dort vorgegebene Templates zur Verfügung. Eine vollständig frei gestaltete HTML-Mail im exakten JDD-Website-Design ist mit diesem einfachen FormSubmit-Setup nicht vorgesehen. Dafür wäre ein eigener Mail-/Backend-Dienst nötig.


## Wichtig: FormSubmit einmal aktivieren

Beim ersten Absenden schickt FormSubmit eine Aktivierungs-E-Mail an **hello@jdd-visuals.de**. Diese E-Mail muss geöffnet und der Aktivierungslink angeklickt werden. Erst danach werden neue Anfragen an dieses Postfach weitergeleitet und die automatische Antwort an den Kunden kann funktionieren.

Die E-Mail des Kunden wird im Formular als normales Feld `name="email"` übermittelt. Das ist für die FormSubmit-Autoresponse erforderlich.


## Anfrage-Bestätigung

Die Formularweiterleitung nutzt die eigene JDD-Visuals-Seite `thanks.html` als `_next`-Ziel. Die FormSubmit-Antwort an den Auftraggeber ist vollständig auf Deutsch und im JDD-Visuals-Ton formuliert.

**Hinweis:** FormSubmit stellt für die automatische E-Mail nur seine eigenen Mail-Templates bzw. einen eigenen Nachrichtentext bereit. Eine 1:1 HTML-E-Mail mit dem kompletten Website-Layout ist mit FormSubmit nicht möglich. Dafür wäre ein eigener Transaktionsmail-Dienst/Backend nötig.


## EmailJS-Formular

Das Projektformular verwendet jetzt EmailJS statt FormSubmit.

- Service ID: `service_czz6i7j`
- Anfrage-Template: `template_fcsxl1x`
- Kunden-Antwort: `template_ufo7rkb`
- Ziel der Anfrage: `visualsjdd@gmail.com`

Nach erfolgreichem Versand wird `thanks.html` im JDD-Visuals-Design geöffnet.

Der EmailJS Public Key ist für die Verwendung im Browser vorgesehen. **Niemals private API-Schlüssel oder Passwörter in diesen Repository-Code eintragen.**


## WICHTIG: EmailJS Auto-Reply richtig verbinden

Damit **beide** E-Mails funktionieren, darf die Kunden-Bestätigung nicht als zweiter `sendForm()`-Aufruf aus der Website gesendet werden.

In EmailJS:
1. Öffne `template_fcsxl1x` (Neue Projektanfrage – JDD Visuals).
2. Öffne dort den Tab **Auto-Reply**.
3. Wähle als **Linked Template**: `template_ufo7rkb`.
4. Speichern.

Danach reicht ein einziger Versand der Hauptvorlage. EmailJS verschickt die verknüpfte Auto-Reply automatisch an `{{email}}`. Das entspricht der aktuellen EmailJS-Auto-Reply-Konfiguration. 
