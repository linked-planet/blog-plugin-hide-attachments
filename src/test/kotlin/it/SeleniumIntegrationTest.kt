/*-
 * #%L
 * blog-plugin
 * %%
 * Copyright (C) 2023 The Plugin Authors
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
package it

import org.junit.*
import org.junit.Assert.assertTrue
import org.openqa.selenium.*
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.support.ui.*
import java.time.Duration
import java.util.concurrent.TimeUnit

class SeleniumIntegrationTest {

    @Test
    fun testUserInterfaceAvailable() {
        openModuleUrl()
    }

    @After
    fun shutdown() {
        driver.close()
    }

    private fun openModuleUrl() {
        // open the module web page
        driver.get(MODULE_URL)


        // loading spinner is there and disappears after a few seconds
        val mainComponent = driver.findElement(By.id("main-component"))
        val loadingSpinnerSelector = By.className("util-align-loading-spinner")
        val loadingSpinner = mainComponent.findElement(loadingSpinnerSelector)
        assertTrue(loadingSpinner.isDisplayed)
        WebDriverWait(driver, Duration.ofSeconds(5)).until(
            ExpectedConditions.numberOfElementsToBe(loadingSpinnerSelector, 0)
        )

        // after loading spinner disappears, we see the actual main component content
        WebDriverWait(driver, Duration.ofSeconds(5)).until(
            ExpectedConditions.textToBePresentInElement(
                mainComponent.findElement(By.tagName("div")),
                "Visit us"
            )
        )
    }

    private companion object {
        private const val BASE_URL = "http://localhost:2990"
        private const val MODULE_URL = "$BASE_URL/secure/ModuleAction!default.jspa"

        private lateinit var driver: WebDriver

        @BeforeClass
        @JvmStatic
        fun configureSelenium() {
            System.setProperty("webdriver.gecko.driver", "target/test-classes/drivers/geckodriver-linux-64bit")
            driver = FirefoxDriver()
            driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS)
        }

    }

}
