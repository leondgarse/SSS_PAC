# SSS_PAC
Shadow Socks Server PAC for my own usage
***

# PAC source
- `whitelist.pac` clone from [Github MatcherAny/whitelist.pac]https://github.com/MatcherAny/whitelist.pac.git
- `blacklist.pac` clone from [Github Alvin9999/new-pac](https://github.com/Alvin9999/new-pac.git)
# 配置
- [Ubuntu Shadow socket 代理配置](https://github.com/leondgarse/Atom_notebook/blob/master/public/2013_Basic/05-12_Ubuntu_Usage.md#shadow-socket-%E4%BB%A3%E7%90%86)
# 脚本说明
- [pac_test.sh](pac_test.sh) 测试 `blacklist.pac` 中的的地址，将 **正常连接不上，启用代理后可以连接** 的地址添加到 `refine_blacklist.pac` 中
  ```sh
  nc -w $TIME_OUT -vz $DOMAIN 80  # NORMAL_RESULT ！= 0
  proxychains nc -w $TIME_OUT -vz $DOMAIN 80  # PROXY_RESULT == 0
  ```
- [SSS.sh](SSS.sh) 测试 `SSS.tsv` 文件中的代理地址，寻找第一个可用的，`SSS.tsv` 使用 `tab` 分割
  ```sh
  V/T/U/M	Address	Port	Password	Method			
  10↑/10↑/10↑/10↑	111.111.111.111	10101	paqssword	aes-256-gcm	09:17:04	US
  ```
