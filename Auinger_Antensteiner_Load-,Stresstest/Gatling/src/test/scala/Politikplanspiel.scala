
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Politikplanspiel extends Simulation {

	val httpProtocol = http
		.baseUrl("http://68.183.219.10:5000")
		.inferHtmlResources()
		.acceptHeader("application/json, text/plain, */*")
		.acceptLanguageHeader("de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7")
		.contentTypeHeader("application/json;charset=UTF-8")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")

    val uri1 = "68.183.219.10"


	val asdf = scenario("Politikplanspiel")
		.exec(
			http("Load Page")
			.get("http://" + uri1 + "/")
			.check(status.is(200))
		)
		.pause(1)
		.exec(
			http("Get Termination")
			.get("/termination")
			.check(status.is(200))
		)
		.pause(10)
		.exec(
			http("initial Result")
			.post("/result")
			.body(StringBody("""{}""")).asJson
			.check(bodyString.saveAs( "RESPONSE_DATA" )))
		.exec(
			http("get basic Question")
			.get("/question/basic")
			.check(status.is(200))
		)
		.exec(
			http("first sinusRes")
			.post("/result/sinusRes")
			.body(StringBody("${RESPONSE_DATA}")).asJson
			.check(status.is(200))
		).exec(
			http("get gehobene")
			.get("/question/gehobene")
			.check(status.is(200))
		)
		.exec(
			http("second sinusRes")
			.post("/result/sinusRes")
			.body(StringBody("${RESPONSE_DATA}")).asJson
			.check(status.is(200))
		)
		.exec(
			http("get Tooltips")
			.get("/tooltip")
			.check(status.is(200))
		)
		.exec(
			http("get Scenarios")
			.get("/scenario")
			.check(status.is(200))
		)
		.exec(
			http("set ElectionProposal")
			.post("/result/electionProposal")
			.body(StringBody("${RESPONSE_DATA}")).asJson
			.check(status.is(200))
		)
	
	setUp(asdf.inject(rampUsers(50)during(60 seconds))).protocols(httpProtocol)
}
