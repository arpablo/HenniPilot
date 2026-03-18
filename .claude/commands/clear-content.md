Lösche alle Dateien unter dem `content/` Verzeichnis, mit folgenden Ausnahmen:
- `content/index.md` NICHT löschen
- Dateien unter `content/help/` NICHT löschen
- Dateien unter `.obsidian/` NICHT löschen (falls vorhanden)
- Verzeichnisse selbst NICHT löschen, nur die Dateien darin

Führe den folgenden Befehl aus:

```
find content -type f -not -path 'content/index.md' -not -path 'content/help/*' -not -path '*/.obsidian/*' -delete
```

Zeige danach an, wie viele Dateien gelöscht wurden und welche Verzeichnisse noch Dateien enthalten.
