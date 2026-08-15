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
