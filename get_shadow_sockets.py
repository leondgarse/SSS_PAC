#!/usr/bin/env python3

import requests
import re


def parse_proxy_from_html(html):
    title_pattern = re.compile(
        r'<th class="sorting" tabindex="0" aria-controls="tbss" rowspan="1" colspan="1" aria-label=.*?>(.*?)</th>'
    )
    class_pattern = re.compile(r'<i class="fa (.*?)" aria-hidden=.*?></i>')
    tt = title_pattern.findall(html)
    title = [class_pattern.findall(ii)[0] if "</i>" in ii else ii for ii in tt]

    body_pattern = re.compile(
        r'<tr role="row" class=".*?"><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td class="sorting_1"><i class="fa fa-qrcode" aria-hidden="true" style="cursor:pointer"></i></td></tr>',
        re.M | re.S,
    )
    data = body_pattern.findall(html)
    # Keep format in 'V/T/U/M, Address, Port, Method, Password, fa-clock-o, fa-globe'
    if title[3] != "Method":
        # Swap Password and Method
        data = [(ii[0], ii[1], ii[2], ii[4], ii[3], ii[5]) for ii in data]
    return "\n".join([",".join(ii) for ii in data])


def get_proxy_from_server_by_webdriver(url, wait_time=20):
    from selenium import webdriver
    import time

    # user_agent ='Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24'
    user_agent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36"
    opt = webdriver.ChromeOptions()

    opt.add_experimental_option("excludeSwitches", ["enable-automation"])
    opt.add_argument("--user-agent=%s" % user_agent)
    opt.add_argument("--window-size=640,480")
    # opt.add_argument('--headless')
    driver = webdriver.Chrome("chromedriver", options=opt)
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
    contents = ret.content.decode("utf-8")

    title_pattern = re.compile(r"<thead>\r\n<tr>\r\n" + r'<th align="center">(.*?)</th>\r\n' * 7 + r"</tr>\r\n</thead>")
    title = title_pattern.findall(contents)
    title_dict = {"端口": "Port", "密码": "Password", "加密": "Method", "协议": "Protocol", "混淆": "Obf"}
    title = [title_dict.get(ii, ii) for ii in title[0][1:]]

    body_pattern = re.compile(
        r'<tr>\r\n<td align="center"><a href="ssr://.*?</a></td>\r\n' + r'<td align="center">(.*?)</td>\r\n' * 6 + r"</tr>"
    )
    body = body_pattern.findall(contents)
    pp = {frozenset((ii[0], ii[1])): ii for ii in body if ii[3] != "none"}
    dd = pd.DataFrame(pp.values(), columns=title)

    if output:
        sep = "\t" if output.endswith(".tsv") else ","
        dd.to_csv(output, sep=sep, index=False)
    return dd


def get_ssr_from_sspool_clash(output=None, url="sspool", head=-1, sort_speed=True):
    import pandas as pd
    import json

    url_dict = {
        "sspool": "https://sspool.nl/clash/proxies",
        "proxypool": "https://proxypool.ednovas.xyz/clash/proxies",
        "stgod": "https://hello.stgod.com/clash/proxies",
        "purel": "https://proxy.purel.in/clash/proxies",
        "6166888": "https://6166888.xyz/clash/proxies",
    }

    if not url.startswith("http"):
        url = url_dict.get(url, "https://sspool.nl/clash/proxies")

    print("Target url:", url)
    ret = requests.get(url)
    bb = [json.loads(ii[2:]) for ii in ret.text.strip().split("\n")[1:]]
    if sort_speed:
        dd = pd.DataFrame([ii for ii in bb if ii["type"] == "ss" and "plugin" not in ii and "|" in ii["name"] and "ufunr" not in ii["server"]])
        dd["speed_MB"] = dd.name.map(lambda ii: float(ii.split("|")[1][:-2]))
        dd = dd.sort_values("speed_MB", ascending=False)
    else:
        dd = pd.DataFrame([ii for ii in bb if ii["type"] == "ss" and "plugin" not in ii and "ufunr" not in ii["server"]])

    if head > 0:
        dd = dd.head(head)
    if output:
        sep = "\t" if output.endswith(".tsv") else ","
        dd.to_csv(output, sep=sep, index=False)
    return dd


if __name__ == "__main__":
    import argparse
    import sys
    import os

    ss_servers_speed = ["sspool", "proxypool"]
    ss_servers_no_speed = ["stgod", "bitefu", "purel", "6166888"]
    ss_servers = ", ".join(ss_servers_speed + ss_servers_no_speed)

    file_dir = os.path.dirname(os.path.abspath(__file__))

    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-u", "--url", type=str, help="Shadow sockes server: " + ss_servers, default="sspool")
    parser.add_argument("-t", "--wait_time", type=int, default=20, help="Wait time before expire.")
    parser.add_argument("-o", "--output", type=str, default=os.path.join(file_dir, "SSS.tsv"), help="Output file path.")
    parser.add_argument("-H", "--head", type=int, default=-1, help="Save only the top [NUM] address.")
    parser.add_argument("-S", "--no_sort_speed", action="store_true", help="Disable sort by speed.")
    args = parser.parse_args(sys.argv[1:])
    args.sort_speed = not args.no_sort_speed if args.url in ss_servers_speed else False

    if "bitefu" in args.url:
        get_ssr_from_bitefu(args.output)
    elif args.url in ss_servers_speed + ss_servers_no_speed:
        get_ssr_from_sspool_clash(args.output, url=args.url, head=args.head, sort_speed=args.sort_speed)
    else:
        proxy_body = get_proxy_from_server_by_webdriver(args.url, wait_time=args.wait_time)
        print(proxy_body)
