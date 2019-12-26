*** Settings ***
Library    String
Library    Collections
Library    RequestsLibrary
Library    util
Suite Setup    Run Keywords    Open Browser    http://localhost:4200/login    browser=chrome
...                    AND    Maximize Browser Window
Suite Teardown    Close all Browsers

*** Variables ***
${threeSeconds} =    3s

*** Test Cases ***
Create User With Facebook Account
    On Create Role Page
    Select Charactor    病患
    Input Information
    Use Role To Login
    [Teardown]    Back To Home Page

Get Medical Institution Information
    Use Patient Role To Login With Facebook
    Go To Medical Shared Information
    Select National Taiwan University Hospital
    Verify National Taiwan University Hospital Is Shown
    [Teardown]    Back To Home Page

Filter Query Function
    Use Patient Role To Login With Facebook
    Go To Medical Institution Filter Function Page
    Input Filter Conditions
    Select National Taiwan University Hospital
    Verify Filter Result On Page
    [Teardown]    Back To Home Page

Manage Patient Information
    Use Patient Role To Login With Facebook
    Click Element After It Is Visble    //a[normalize-space()='病人資訊管理功能']    error='病人資訊管理功能' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入你的電話']    text=0900000000    error='輸入你的電話' should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button is not clickable.
    Confirm Action
    Confirm Action
    [Teardown]    Close All Browsers

Create Institution With Facebook Account
    Open Browser    http://localhost:4200/login    browser=chrome
    Login With Medical Institution
    Click Element After It Is Visble    //a[normalize-space()='創建角色功能']    error=創建腳色功能 should be visible.
    Select Charactor    醫療機構
    Input Text After It Is Visble    //*[@placeholder='輸入機構名稱']    text=台北科技大學    error='輸入機構名稱' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入地址']    text=台北市大安區忠孝東路三段1號    error='輸入地址' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入電話']    text=0227712171    error='輸入電話' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入服務名稱']    text=研究所    error='輸入服務名稱' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入服務類別']    text=資工系    error='輸入服務類別' should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button is not clickable.
    Confirm Action
    Confirm Action
    Confirm Action
    Login With Medical Institution
    [Teardown]    Close All Browsers

Medical Institution Modify Patient Medical Record
    Open Browser    http://localhost:4200/login    browser=chrome
    Login With Medical Institution
    Go To Medical Shared Information
    Search For Patient Medical Record
    Input Patient Personal Record
    Verify Record Is Created
    [Teardown]    Back To Home Page

Manage Institution Information With Alias
    Login With Medical Institution
    Click Element After It Is Visble    //a[normalize-space()='醫療機構資訊管理功能']    error='醫療機構資訊管理功能' should be visible.
    Click Element After It Is Visble    //*[@id='add' and normalize-space()='新增別名']    error='新增別名' button should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入別名']    text=北科大    error='輸入別名' should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button is not clickable.
    Confirm Action
    Confirm Action
    [Teardown]    Back To Home Page

Manage Institution Information With Service
    Login With Medical Institution
    Click Element After It Is Visble    //a[normalize-space()='醫療機構資訊管理功能']    error='醫療機構資訊管理功能' should be visible.
    Click Element After It Is Visble    //*[@id='add' and normalize-space()='新增服務']    error='新增服務' button should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入服務名稱']    text=大學部    error='輸入服務名稱' should be visible.
    Input Text After It Is Visble    //*[@placeholder='輸入服務類別']    text=資工系    error='輸入服務類別' should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button is not clickable.
    Confirm Action
    Confirm Action
    [Teardown]    Back To Home Page

*** Keywords ***
Input Filter Conditions
    Input Text After It Is Visble    //*[@placeholder='the Institution Name']    國立台灣大學醫學院附設醫院    error='機構名稱或別名' should be visible.
    Input Text After It Is Visble    //*[@placeholder='ex:台北市｜台北市大安區']    台北市中正區中山南路    error='機構位置' should be visible.
    Input Text After It Is Visble    //*[@placeholder='the Medical service name']    心臟血管科    error='醫療服務' should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error='submit' button should be visible.

Go To Medical Institution Filter Function Page
    Click Element After It Is Visble    //a[normalize-space()='醫療機構過濾功能']    error=醫療機構過濾功能 can not be clicked.

Select National Taiwan University Hospital
    Click Element After It Is Visble    //*[normalize-space()='國立台灣大學醫學院附設醫院']    error= 國立台灣大學醫學院附設醫院 can not be clicked.
    Wait Until Element Is On Page    //i[normalize-space()='Institution Information']    error=Institution Information is not visible.

Verify Record Is Created
    Wait Until Element Is On Page    //*[normalize-space()='發燒']    error=page should contains 發燒

Verify National Taiwan University Hospital Is Shown
    Execute Javascript    window.document.getElementById('subtitleText').scrollIntoView({behavior:'smooth'});
    Sleep    3s

Verify Filter Result On Page
    Execute Javascript    window.document.getElementsByTagName('font')[1].scrollIntoView({behavior:'smooth'});
    Sleep    3s

Search For Patient Medical Record
    Input Text After It Is Visble    //*[@name='patientId']    SMIS-1788641876    error=ID field should be visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button should be visible.
    Sleep    5s
    Insert Into Prompt    5278
    Confirm Action
    Wait Until Element Is On Page    //*[@id='subtitleText' and contains(normalize-space(),'Personal')]    error=Personal Medical Record should be visble. 

Go To Medical Shared Information
    Click Element After It Is Visble    //a[normalize-space()='醫療資訊共享功能']    error=醫療資訊共享功能 should be visible.

Login With Medical Institution
    Click Element After It Is Visble    //*[@id='login-href']    error=logoff button should be visible.
    Login With Institution Role
    Sleep    3s

Input Patient Personal Record
    Execute Javascript    document.getElementById("add").scrollIntoView({behavior:'smooth'});
    Press Key    //input[@placeholder='輸入開始時間']    \\49
    Press Key    //input[@placeholder='輸入開始時間']    \\09
    Press Key    //input[@placeholder='輸入開始時間']    0922
    Press Key    //input[@placeholder='輸入結束時間']    \\49
    Press Key    //input[@placeholder='輸入結束時間']    \\09
    Press Key    //input[@placeholder='輸入結束時間']    0925
    Input Text After It Is Visble    //input[@placeholder='輸入症狀']    發燒    error=輸入症狀 field should be visible.
    Click Element After It Is Visble    //*[@id='submit' and normalize-space()='送出']    error=送出 button should be visible.
    Confirm Action
    Confirm Action

Back To Home Page
    Click Element After It Is Visble    //*[@class='title']    error=title should be visible.

Use Role To Login
    Click Element After It Is Visble    //img[contains(@src, 'facebook')]    timeout=${threeSeconds}    error=Facebook icon should be visible.
    ${windows} =    List Windows
    Select Window    ${windows[1]}
    Input Text After It Is Visble    //input[@id='pass']    Ihate5278    error=Facebook email input text should be visible.
    Click Element After It Is Visble    //input[@name='login']    error=login icon should be visible.
    Select Window    ${windows[0]}

Use Patient Role To Login With Facebook
    Click Element After It Is Visble    //img[contains(@src, 'facebook')]    timeout=${threeSeconds}    error=Facebook icon should be visible.
    ${windows} =    List Windows
    Select Window    ${windows[1]}
    Input Text After It Is Visble    //input[@id='email']    derry95922@gmail.com    error=Facebook email input text should be visible.
    Input Text After It Is Visble    //input[@id='pass']    Ihate5278    error=Facebook email input text should be visible.
    Click Element After It Is Visble    //input[@name='login']    error=login icon should be visible.
    Select Window    ${windows[0]}

Input Information
    Input Text After It Is Visble    //input[contains(@placeholder,'輸入你的名字')]    嗣岱    error=名字 field is not visible.
    Input Text After It Is Visble    //input[contains(@placeholder,'輸入你的姓氏')]    張    error=名字 field is not visible.
    Press Key    //*[@name='birth']    1995
    Press Key    //*[@name='birth']    \\09
    Press Key    //*[@name='birth']    0922
    Input Text After It Is Visble    //input[contains(@placeholder,'輸入你的隱私金鑰')]    5278    error=隱私金鑰 field is not visible.
    Click Element After It Is Visble    //*[@id='submit']    error=送出 button is not clickable.
    Confirm Action
    Confirm Action
    Confirm Action

On Create Role Page
    Click Element After It Is Visble    //img[contains(@src, 'facebook')]    timeout=${threeSeconds}    error=Facebook icon should be visible.
    ${windows} =    List Windows
    Select Window    ${windows[1]}
    Input Text After It Is Visble    //input[@id='email']    derry95922@gmail.com    error=Facebook email input text should be visible.
    Input Text After It Is Visble    //input[@id='pass']    Ihate5278    error=Facebook email input text should be visible.
    Click Element After It Is Visble    //input[@name='login']    error=login icon should be visible.
    Select Window    ${windows[0]}
    Click Element After It Is Visble    //a[normalize-space()='創建角色功能']    error=創建腳色功能 should be visible.
    # ${url} =    Get Location
    # @{urlList} =    Split String    ${url}    /
    # ${urlLast} =    Get From List    ${urlList}    -1
    # Evaluate    request.post('http://hapi.fhir.org/delete?serverId=home_r4&pretty=true&resource=Patient&resource-delete-id=%s' % ${urlLast})

Login With Institution Role
    Click Element After It Is Visble    //img[contains(@src, 'facebook')]    timeout=${threeSeconds}    error=Facebook icon should be visible.
    ${windows} =    List Windows
    Select Window    ${windows[1]}
    Input Text After It Is Visble    //input[@id='email']    0918526265    error=Facebook email input text should be visible.
    Input Text After It Is Visble    //input[@id='pass']    95816973    error=Facebook email input text should be visible.
    Click Element After It Is Visble    //input[@name='login']    error=login icon should be visible.
    Select Window    ${windows[0]}

Wait Until Element Is On Page
    [Arguments]    ${locator}    ${error}    ${timeout}=${threeSeconds}
    Wait Until Page Contains Element    ${locator}    timeout=${timeout}    error=${error}
    Wait Until Element Is Visible    ${locator}    timeout=${timeout}    error=${error}

Select Charactor
    [Arguments]    ${charactor}
    Click Element After It Is Visble    //*[contains(@class,'label-content') and contains(normalize-space(),'${charactor}')]/preceding-sibling::*    error=${charactor} text should be visible.
    Wait Until Element Is On Page    //*[contains(@class,'checked')]//*[contains(@class,'mat-radio-label-content') and contains(normalize-space(),'${charactor}')]/preceding-sibling::*    error=${charactor} should be checked.

Input Text After It Is Visble
    [Arguments]    ${locator}    ${text}    ${error}    ${timeout}=${threeSeconds}
    Wait Until Element Is On Page    ${locator}    ${error}    ${timeout}
    Input Text    ${locator}    ${text}

Click Element After It Is Visble
    [Arguments]    ${locator}    ${error}    ${timeout}=${threeSeconds}
    Wait Until Element Is On Page    ${locator}    ${error}    ${timeout}
    Click Element    ${locator}