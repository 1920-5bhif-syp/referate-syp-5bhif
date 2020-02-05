
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class HtlLeonding extends Simulation {

	val httpProtocol = http
		.baseUrl("https://www.htl-leonding.at")
		.inferHtmlResources()
		.acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7")
		.doNotTrackHeader("1")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")

	val scn = scenario("HtlLeonding")
		.exec(http("MainPage")
			.get("/")
			.resources(//Allows to fetch resources in parallel in order to emulate the behaviour of a real web browser
				http("HTL-Logo")
					.get("/wp-content/uploads/2018/12/htllogo-768x114.png"),
        http("request_2")
					.get("/wp-content/uploads/2020/01/20200118_01-400x267.jpg"),
        http("request_3")
					.get("/wp-content/uploads/2019/11/banner_full_ueberuns-768x512.jpg"),
				http("request_4")
					.get("/wp-content/uploads/2020/01/fit_2019-400x267.jpg"),
				http("request_5")
					.get("/wp-content/uploads/2020/01/hartheim_01_20_banner2-400x266.jpg"),
				http("request_6")
					.get("/wp-includes/js/wp-emoji-release.min.js?ver=5.3.2"),
				http("request_7")
					.get("/wp-content/uploads/2019/03/anmeldung_hoehereAbteilung.png"),
				http("request_8")
					.get("/wp-content/themes/HTL-Leo%204.0%20WordPress/font/OpenSans-Light.ttf?x92352"),
				http("request_9")
					.get("/wp-content/uploads/media/19_06_Drone_Mainentrance.mp4")
			)
		)

	setUp(scn.inject(atOnceUsers(10))).protocols(httpProtocol)
}
