#!/usr/bin/env python3

import os
import yaml

PROXY_GROUP_TOKENS = {
    "🇭🇰 香港节点": "HK",
    "🇯🇵 日本节点": "JP",
    "🇺🇲 美国节点": "US",
    "🇨🇳 台湾节点": "TW",
    "🇸🇬 狮城节点": "SG",
    "🇰🇷 韩国节点": "KR",
    "🌍 其他地区": "others",
    "♻️ 专线节点": "raw",
    "♻️ 手动切换": "all",
    "♻️ 自动选择": "all",
}
ALL_TOKENS = [ii for ii in PROXY_GROUP_TOKENS.values() if ii not in ["all", "others", "none", "raw"]]


def gen_empty(source_yaml="~/.config/clash/config.yaml", save_yaml="empty.yaml"):
    with open(os.path.expanduser(source_yaml), encoding="utf-8") as ff:
        basic = yaml.safe_load(ff.read())
    proxies = [ii["name"] for ii in basic["proxies"]]
    for cur in basic["proxy-groups"]:
        cur["proxies"] = [ii for ii in cur["proxies"] if ii not in proxies]
    basic["proxies"] = []

    with open(save_yaml, "w", encoding="utf-8") as ff:
        yaml.safe_dump(basic, ff, allow_unicode=True)
    print(">>>> Output:", save_yaml)


def update_proxies(update_yaml="clash.yaml", save_yaml="config.yaml", basic_yaml="empty.yaml"):
    with open(os.path.expanduser(basic_yaml), encoding="utf-8") as ff:
        basic = yaml.safe_load(ff.read())

    with open(update_yaml, encoding="utf-8") as ff:
        updates = yaml.safe_load(ff.read())

    proxies = [ii for ii in updates["proxies"] if isinstance(ii["port"], int) and "CN" not in ii["name"]]
    proxy_names = [ii["name"] for ii in proxies]
    basic["proxies"] = proxies

    auto_select = {"name": "♻️ 自动选择", "type": "url-test", "url": "http://www.google.com/", "interval": 300, "proxies": []}
    basic["proxy-groups"].insert(0, auto_select)

    for cur in basic["proxy-groups"]:
        if cur["name"] in PROXY_GROUP_TOKENS:
            cur_token = PROXY_GROUP_TOKENS[cur["name"]]
            if cur_token == "others":
                cur["proxies"] = [ii["name"] for ii in proxies if all([tt not in ii["name"] for tt in ALL_TOKENS])]
            elif cur_token == "none":
                cur["proxies"] = []
            elif cur_token == "raw":
                cur["proxies"] = cur["proxies"]
            elif cur_token == "all":
                cur["proxies"] = proxy_names.copy()
            else:
                cur["proxies"] = [ii["name"] for ii in proxies if cur_token in ii["name"]]

            if len(cur["proxies"]) == 0:
                cur["proxies"] = ["DIRECT"]
        elif "DIRECT" not in cur["proxies"]:
            cur["proxies"] = proxy_names.copy()

        if cur["name"] != "♻️ 自动选择" and "♻️ 自动选择" not in cur["proxies"]:
            if cur["proxies"][0] in ["DIRECT", "REJECT"]:
                cur["proxies"].append("♻️ 自动选择")
            else:
                cur["proxies"].insert(0, "♻️ 自动选择")

    with open(save_yaml, "w", encoding="utf-8") as ff:
        yaml.safe_dump(basic, ff, allow_unicode=True)
    print(">>>> Output:", save_yaml)


if __name__ == "__main__":
    import argparse
    import sys

    FILE_PATH = os.path.dirname(os.path.realpath(__file__))

    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument("-u", "--update_yaml", type=str, help="source yaml path for update", default="clash.yaml")
    parser.add_argument("-s", "--save_yaml", type=str, help="target yaml path for saving.", default="config.yaml")
    parser.add_argument("-e", "--template_yaml", type=str, help="template yaml path containing rules.", default=os.path.join(FILE_PATH, "template.yaml"))

    args = parser.parse_args(sys.argv[1:])
    update_proxies(update_yaml=args.update_yaml, save_yaml=args.save_yaml, basic_yaml=args.empty_yaml)
