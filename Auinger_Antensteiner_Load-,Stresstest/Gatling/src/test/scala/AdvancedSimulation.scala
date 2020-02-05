
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AdvancedSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("http://computer-database.gatling.io")
		.disableFollowRedirect
		.inferHtmlResources()
		.acceptHeader("application/json, text/plain, */*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")

	object Search {

		val feeder = csv("C:\\Users\\thoma\\Desktop\\SYP\\Gatling\\src\\test\\scala\\search.csv").random

		val search = exec(http("Home") // let's give proper names, as they are displayed in the reports
			.get("/computers"))
			.pause(2)
  		.feed(feeder)
			.exec(http("Search")
				.get("/computers?f=${searchCriterion}")
				.check(css("a:contains('${searchComputerName}')", "href").saveAs("computerURL")))
			.pause(2)
			.exec(http("Select")
				.get("${computerURL}"))
			.pause(3)
	}

	object Browse {

		def gotoPage(page: Int) = exec(http("Page " + page)
			.get("/computers?p=" + page))
			.pause(1)

		val browse = exec(gotoPage(0), gotoPage(1), gotoPage(2), gotoPage(3), gotoPage(4))

		val browseRandom = repeat(5, "n") { // 1
			exec(http("Page ${n}")
				.get("/computers?p=${n}")) // 2
				.pause(1)
		}
	}


	val search = scenario("Search").exec(Search.search).exec(Browse.browse)
	val browse = scenario("Browse").exec(Browse.browse)
	setUp(browse.inject(atOnceUsers(1)).protocols(httpProtocol),search.inject(atOnceUsers(5)).protocols(httpProtocol))
}
