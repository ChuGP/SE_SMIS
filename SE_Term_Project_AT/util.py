from SeleniumLibrary import SeleniumLibrary
from robot.api.deco import keyword
from selenium import webdriver
from selenium.common.exceptions import WebDriverException

class util(SeleniumLibrary):
    @keyword(name='Insert Into Prompt')
    def insert_into_prompt(self, text):
        alert = None    #N 要大寫
        try:
            alert = self._current_browser().switch_to_alert()
            alert.send_keys(text)

        except WebDriverException:
            raise RuntimeError('There were no alert')