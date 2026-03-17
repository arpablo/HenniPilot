---
type: "[[Note]]"
categories:
  - "[[Zettel]]"
created: 2025-07-10 12:44
tags:
topics: []
areas:
  - "[[Area Allgemeinwissen]]"
  - "[[Area Wirtschaft]]"
title: Wie berechnet man die Fläche unter der Lorenzkurve
slug: wie-berechnet-man-die-flaeche-unter-der-lorenzkurve
---
Um die **Fläche unterhalb der Lorenzkurve** zu berechnen, gehst du wie folgt vor:

### Schritt-für-Schritt-Anleitung

1. **Bestimme die kumulierten Anteile** der Bevölkerung und des Einkommens für alle Gruppenmitglieder (z.B. Personen, Dezile, Quintile).
    - Trage diese Werte als Punkte in ein Koordinatensystem ein.
2. **Zerlege die Fläche unter der Lorenzkurve in Trapeze**:
    - Jedes Trapez liegt zwischen zwei benachbarten Punkten der Lorenzkurve.
    - Die Breite jedes Trapezes entspricht dem Unterschied der kumulierten Bevölkerungsanteile ($b$), meist $\frac{1}{n}$ bei $n$ Personen.
    - Die beiden Höhen ($h_1$ und $h_2$) sind die kumulierten Einkommensanteile der beiden benachbarten Punkte.
3. **Berechne die Fläche jedes Trapezes** mit der Formel:

    $$
    A_i = \frac{h_1 + h_2}{2} \cdot b
    $$

    - $h_1$: Kumuliertes Einkommen am linken Punkt
    - $h_2$: Kumuliertes Einkommen am rechten Punkt
    - $b$: Differenz der kumulierten Bevölkerungsanteile (meist konstant)
4. **Summiere alle Trapezflächen** auf, um die Gesamtfläche $L$ unter der Lorenzkurve zu erhalten:

    $$
    L = \sum_{i=1}^{n} A_i
    $$

    oder, für gleich große Bevölkerungsanteile:

    $$
    L = \sum_{i=1}^{n} \frac{h_{i-1} + h_i}{2} \cdot \frac{1}{n}
    $$

    Mit $h_0 = 0$ und $h_n = 1$ (Start- und Endpunkt der Kurve)  [1], [5], [6].

### Beispiel (vereinfacht):

Angenommen, du hast vier Personen mit den kumulierten Einkommensanteilen:

- 0 % (Start)
- 10 %
- 30 %
- 60 %
- 100 % (Ende)

Die Fläche unter der Lorenzkurve berechnet sich dann:

$$
L = \frac{1}{2} \cdot (0 + 0{,}1) \cdot 0{,}25 + \frac{1}{2} \cdot (0{,}1 + 0{,}3) \cdot 0{,}25 + \frac{1}{2} \cdot (0{,}3 + 0{,}6) \cdot 0{,}25 + \frac{1}{2} \cdot (0{,}6 + 1) \cdot 0{,}25
$$

### Wichtig:

- Die **maximal mögliche Fläche** unter der Diagonalen (perfekte Gleichverteilung) ist immer 0,5.
- Die Fläche zwischen der Diagonalen und der Lorenzkurve ist die sogenannte Konzentrationsfläche und dient zur Berechnung des Gini-Koeffizienten  [1], [3], [6].

**Zusammengefasst:**

- Zerlege die Fläche unter der Lorenzkurve in Trapeze.
- Berechne und summiere die Flächeninhalte dieser Trapeze.
- Das Ergebnis ist die Fläche unter der Lorenzkurve.

Quellen
[1] Gini-Koeffizient - Crashkurs Statistik [https://www.crashkurs-statistik.de/gini-koeffizient/](https://www.crashkurs-statistik.de/gini-koeffizient/)
[2] Lorenz-Kurve - Wikipedia [https://de.wikipedia.org/wiki/Lorenz-Kurve](https://de.wikipedia.org/wiki/Lorenz-Kurve)
[3] Gini Koeffizient Definition und Berechnung · [mit Video] - Studyflix [https://studyflix.de/wirtschaft/gini-koeffizient-898](https://studyflix.de/wirtschaft/gini-koeffizient-898)
[4] Gini-Koeffizient • VWL Basiswissen für Nicht-Ökonom_innen [https://www.lai.fu-berlin.de/e-learning/projekte/vwl_basiswissen/Umverteilung/Gini_Koeffizient/index.html](https://www.lai.fu-berlin.de/e-learning/projekte/vwl_basiswissen/Umverteilung/Gini_Koeffizient/index.html)
[5] [PDF] Anleitung zur Berechnung des Index von Gini [https://old.imst.ac.at/files/projekte/1709/anhang/1709_Pircher_2016_Beilage_1.pdf](https://old.imst.ac.at/files/projekte/1709/anhang/1709_Pircher_2016_Beilage_1.pdf)
[6] Kapitel 5 Konzentrationsmessung | Statistik I - Bookdown [https://bookdown.org/benno_hildebrandt/Statistik_I/konzentrationsmessung.html](https://bookdown.org/benno_hildebrandt/Statistik_I/konzentrationsmessung.html)
[7] [PDF] Gini-Koeffizient [http://ernaehrungsdenkwerkstatt.de/fileadmin/user_upload/EDWText/TextElemente/Soziologie/Gini_Koeffizient_Einkommensverteilung.pdf](http://ernaehrungsdenkwerkstatt.de/fileadmin/user_upload/EDWText/TextElemente/Soziologie/Gini_Koeffizient_Einkommensverteilung.pdf)
[8] Lorenz-Kurve: Bedeutung & Anwendung - StudySmarter [https://www.studysmarter.de/studium/mathematik-studium/statistik-studium/lorenz-kurve/](https://www.studysmarter.de/studium/mathematik-studium/statistik-studium/lorenz-kurve/)
[9] Berechnung des Gini-Koeffizienten - WiWiWeb [https://www.wiwiweb.de/statistik/kozentmess/relativkonz/ginikoeffiz.html](https://www.wiwiweb.de/statistik/kozentmess/relativkonz/ginikoeffiz.html)
[10] Lorenzkurve: Berechnen & Zeichnen · [mit Video] - Studyflix [https://studyflix.de/wirtschaft/lorenzkurve-896](https://studyflix.de/wirtschaft/lorenzkurve-896)

