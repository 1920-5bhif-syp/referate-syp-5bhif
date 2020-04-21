## VueJS CI/CD

**Was ist der Unterschied zwischen CI und CD (und der anderen CD)?**

Die Abkürzung CI/CD hat unterschiedliche Bedeutungen. „CI“ bedeutet Continuous Integration, also der Automatisierungsprozess für Entwickler. Bei einer erfolgreichen CI werden regelmäßig neue Codeänderungen für Apps entwickelt, geprüft und in einem gemeinsamen Repository zusammengeführt. Damit soll der Konflikt verhindert werden, den zu viele Branches einer App verursachen können, wenn sie zeitgleich entwickelt werden.

„CD“ bedeutet Continuous Delivery bzw. Continuous Deployment. Dass sind verwandte Konzepte, die zuweilen synonym verwendet werden. Obwohl es bei beiden Konzepten um die Automatisierung weiterer Phasen der Pipeline geht, werden die Begriffe manchmal unterschiedlich verwendet, um das Ausmaß der Automatisierung zu verdeutlichen.

Continuous Delivery bedeutet üblicherweise, dass App-Änderungen eines Entwicklers automatisch auf Bugs getestet und in ein Repository (wie GitHub oder eine Container-Registry) hochgeladen werden, von wo aus sie vom Operations-Team in einer Live-Produktivumgebung bereitgestellt werden können. Dieser Vorgang ist die Antwort auf Transparenz- und Kommunikationsprobleme zwischen Dev- und Business-Teams. Damit soll sichergestellt werden, dass neuer Code mit minimalem Aufwand implementiert werden kann.

Continuous Deployment (das andere „CD“) kann sich auf die automatische Freigabe von Entwickleränderungen vom Repository zur Produktivphase beziehen, wo sie direkt vom Kunden genutzt werden können. Dieser Vorgang soll der Überlastung von Operations-Teams bei manuellen Prozessen entgegenwirken, die die Anwendungsbereitstellung verlangsamen. Continuous Development baut die Vorteile der Continuous Delivery aus, indem auch noch die nächste Phase der Pipeline automatisiert wird.
*https://www.redhat.com/*

<div class="sl-block is-focused" data-block-type="image" style="min-width: 1px; min-height: 1px; width: 860px; height: 411px; left: 50px; top: 181px;" data-origin-id="e842079a13db6fadce37bb8509fd0280"><div class="sl-block-content" style="z-index: 11;"><img style="" data-natural-width="875" data-natural-height="418" data-lazy-loaded="" src="https://s3.amazonaws.com/media-p.slid.es/uploads/1141232/images/6884526/Continous-Integration-and-Agile-Roadmap.png"></div></div>

*https://s3.amazonaws.com/media-p.slid.es/uploads/1141232/images/6884526/Continous-Integration-and-Agile-Roadmap.png*


**Wie funktioniert eine Pipeline in Jenkins?**

Grundsätzlich werden Verzeichnisse an die Jenkinspipeline genüpft und entweder über die visuelle Oberfläche oder über ein von außen angegebenes Jenkinsfile.
Vorteile gegenüber des visuellen Skriptens direkt auf dem Jenkinsserver bietet das externe File indem es nicht auf dem Server gebunden ist und jederzeit auf anderen übertragbar ist.

Grundsätzlich wird die Pipeline in Buildsteps getrennt und so schritt für schritt aufgebaut.

<img src="https://3ovyg21t17l11k49tk1oma21-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/Screen-Shot-2018-07-30-at-7.56.54-AM.png">
*netda-ssl.com*

**Wie funktioniert Github Actions?**

Github Actions ist das Pendant zu Jenkins von Github.
Hier wird im .github Verzeichnis eines Projekts einen Workflow im main.yml angegeben.
Meist wird eine vordefinierte Githubaction aus dem [Marketplace](https://github.com/marketplace?type=actions) importiert und dann angepasst.

<img src="https://i.imgur.com/f6jS9od.png">

#### Demo #1

[Repo](https://github.com/FabianAhammer/SypCypressVue)

#### Demo #2

[Repo](https://github.com/FabianAhammer/SypCypressVue/blob/master/.github/workflows/main.yml)

[Action](https://github.com/FabianAhammer/SypCypressVue/actions/runs/27208010/workflow)

#### Demo #3

[Repo](https://github.com/FabianAhammer/SypCypressVue/blob/master/Jenkinsfile)

[Jenkins](https://jenkins.vm81.htl-leonding.ac.at/job/CypressPipeline2/configure)
