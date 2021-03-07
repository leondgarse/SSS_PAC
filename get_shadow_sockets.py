#!/usr/bin/env python3

import requests
import re

def parse_proxy_from_html(html):
    title_pattern = re.compile(r'<th class="sorting" tabindex="0" aria-controls="tbss" rowspan="1" colspan="1" aria-label=.*?>(.*?)</th>')
    class_pattern = re.compile(r'<i class="fa (.*?)" aria-hidden=.*?></i>')
    tt = title_pattern.findall(html)
    title = [class_pattern.findall(ii)[0] if '</i>' in ii else ii for ii in tt]

    body_pattern = re.compile(r'<tr role="row" class=".*?"><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr>',re.M|re.S)
    data = body_pattern.findall(html)
    # Keep format in 'V/T/U/M, Address, Port, Method, Password, fa-clock-o, fa-globe'
    if title[3] != 'Method':
        # Swap Password and Method
        data = [(ii[0], ii[1], ii[2], ii[4], ii[3], ii[5]) for ii in data]
    return '\n'.join([','.join(ii) for ii in data])

def get_proxy_from_server_by_webdriver(url, wait_time=20):
    from selenium import webdriver
    import time

    # user_agent ='Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24'
    user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36"
    opt = webdriver.ChromeOptions()

    opt.add_experimental_option('excludeSwitches', ['enable-automation'])
    opt.add_argument('--user-agent=%s' % user_agent)
    opt.add_argument('--window-size=640,480')
    # opt.add_argument('--headless')
    driver = webdriver.Chrome('chromedriver', options=opt)
    driver.set_window_size(640, 480)
    driver.minimize_window()
    driver.get(url)

    time.sleep(wait_time)
    html = driver.page_source
    driver.close()

    return parse_proxy_from_html(html)

def get_ssr_from_bitefu(output=None):
    import pandas as pd
    
    ret = requests.get("http://tool.bitefu.net/ssr.html")
    contents = ret.content.decode('utf-8')

    title_pattern = re.compile(r'<thead>\r\n<tr>\r\n' + r'<th align="center">(.*?)</th>\r\n' * 7 + r'</tr>\r\n</thead>')
    title = title_pattern.findall(contents)
    title_dict = {"端口": "Port", "密码": "Password", "加密": "Method", "协议": "Protocol", "混淆": "Obf"}
    title = [title_dict.get(ii, ii) for ii in title[0][1:]]

    body_pattern = re.compile(r'<tr>\r\n<td align="center"><a href="ssr://.*?</a></td>\r\n' + r'<td align="center">(.*?)</td>\r\n' * 6 + r'</tr>')
    body = body_pattern.findall(contents)
    pp = {frozenset((ii[0], ii[1])): ii for ii in body if ii[3] != 'none'}
    dd = pd.DataFrame(pp.values(), columns=title)

    if output:
        sep = "\t" if output.endswith(".tsv") else ","
        dd.to_csv(output, sep=sep, index=False)
    return dd
    
def get_ssr_from_sspool_clash(output=None, url_name='sspool'):
    import pandas as pd
    import json
    
    url = 'https://sspool.nl/clash/proxies' if url_name == 'sspool' else "https://proxypool.ednovas.xyz/clash/proxies"
    ret = requests.get(url)
    bb = [json.loads(ii[2:]) for ii in ret.text.strip().split('\n')[1:]]
    dd = pd.DataFrame([ii for ii in bb if ii['type'] == 'ss' and 'plugin' not in ii and '|' in ii['name']])
    dd['speed_MB'] = dd.name.map(lambda ii: float(ii.split('|')[1][:-2]))
    dd['address'], dd['method'] = dd['server'], dd['cipher']
    ee = dd[['address', 'port', 'password', 'method', 'speed_MB', 'country']].sort_values('speed_MB', ascending=False)

    if output:
        sep = "\t" if output.endswith(".tsv") else ","
        ee.to_csv(output, sep=sep, index=False)
    return ee


if __name__ == '__main__':
    import argparse
    import sys

    ss_servers = 'bitefu, sspool, proxypool'

    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-u', '--url', type=str, help='Shadow sockes server: ' + ss_servers, default="sspool")
    parser.add_argument('-t', '--wait_time', type=int, default=20, help='Wait time before expire')
    parser.add_argument('-o', '--output', type=str, default="SSS.tsv", help='Output file path')
    args = parser.parse_args(sys.argv[1:])

    if "bitefu" in args.url:
        get_ssr_from_bitefu(args.output)
    if "sspool" in args.url or 'proxypool' in args.url:
        get_ssr_from_sspool_clash(args.output, url_name=args.url)
    else:
        proxy_body = get_proxy_from_server_by_webdriver(args.url, wait_time=args.wait_time)
        print(proxy_body)


'''
<td>4↑/2↓/1↑/2↑</td><td>215.165.91.104</td><td>37878</td><td>chacha20</td><td>brWnRS64uTBq</td><td>15:32:18</td><td>RU</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>5↑/4↓/7↓/5↑</td><td>178.1.197.203</td><td>49144</td><td>chacha20</td><td>sj9cbK</td><td>15:32:18</td><td>RU</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>9↑/2↑/7↑/10↑</td><td>28.91.207.40</td><td>27970</td><td>chacha20</td><td>5xs3gp</td><td>15:32:17</td><td>US</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>5↑/2↓/1↓/9↓</td><td>103.104.55.97</td><td>65147</td><td>chacha20</td><td>QwrGYh5PANxq</td><td>15:32:31</td><td>JP</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>9↑/4↓/6↑/4↓</td><td>218.206.153.86</td><td>17933</td><td>chacha20</td><td>JaITUW3EQAM</td><td>15:32:22</td><td>US</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>9↑/7↑/5↑/2↓</td><td>111.187.8.206</td><td>15413</td><td>aes-256-cfb</td><td>LBnFWI</td><td>15:32:17</td><td>RU</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>6↓/7↑/1↑/1↑</td><td>222.208.207.156</td><td>64190</td><td>aes-256-cfb</td><td>mCovCeK</td><td>15:32:16</td><td>SG</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>7↑/5↑/2↑/2↑</td><td>13.99.222.131</td><td>40324</td><td>aes-256-cfb</td><td>00QUoGm8t</td><td>15:32:32</td><td>JP</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>7↑/1↓/2↑/3↑</td><td>220.243.182.191</td><td>61939</td><td>aes-256-cfb</td><td>qY42rtHU7</td><td>15:32:27</td><td>SG</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>8↓/5↓/8↑/9↓</td><td>59.39.102.79</td><td>64614</td><td>chacha20</td><td>36qXNc</td><td>15:32:18</td><td>SG</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>6↑/5↑/5↓/1↓</td><td>152.213.43.110</td><td>41953</td><td>chacha20</td><td>xq4kTGwOs4</td><td>15:32:28</td><td>JP</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>8↑/9↓/2↑/5↓</td><td>146.221.132.141</td><td>55711</td><td>chacha20</td><td>J39ITJh26c</td><td>15:32:20</td><td>RU</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>7↓/4↑/9↑/6↓</td><td>81.43.116.59</td><td>29852</td><td>chacha20</td><td>rblBkq</td><td>15:32:11</td><td>JP</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>8↑/1↑/3↓/3↑</td><td>22.255.67.23</td><td>51652</td><td>rc4-md5</td><td>SQDNR4x</td><td>15:32:26</td><td>RU</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
<td>4↓/7↑/10↓/9↓</td><td>97.123.0.8</td><td>38030</td><td>chacha20</td><td>EduOCvQuOx</td><td>15:32:29</td><td>JP</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="even">
<td>6↓/4↓/6↓/4↓</td><td>37.40.250.69</td><td>12148</td><td>rc4-md5</td><td>vQO6VOjHbgx5</td><td>15:32:28</td><td>SG</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr><tr role="row" class="odd">
'''
