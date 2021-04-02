# SSS_PAC
Shadow Socks Server PAC for my own usage
***

### PAC source
- `blacklist.pac` cloned from [Github Alvin9999/new-pac](https://github.com/Alvin9999/new-pac.git)
### 配置
- [Ubuntu Shadow socket 代理配置](https://github.com/leondgarse/Atom_notebook/blob/master/public/2013_Basic/05-12_Ubuntu_Usage.md#shadow-socket-%E4%BB%A3%E7%90%86)
### 脚本说明
- [pac_test.sh](pac_test.sh) 测试 `blacklist.pac` 中的的地址，将 **正常连接不上，启用代理后可以连接** 的地址添加到 `refine_blacklist.pac` 中
  ```sh
  nc -w $TIME_OUT -vz $DOMAIN 80  # NORMAL_RESULT ！= 0
  proxychains nc -w $TIME_OUT -vz $DOMAIN 80  # PROXY_RESULT == 0
  ```
- [SSS.sh](SSS.sh) 测试 `SSS.tsv` 文件中的代理地址，寻找第一个可用的，`SSS.tsv` 使用 `tab` 分割
  ```sh
  V/T/U/M	Address	Port	Password	Method			
  10↑/10↑/10↑/10↑	111.111.111.111	10101	password	aes-256-gcm	09:17:04	US
  ```
  ```sh
  address port    password        method  speed_MB        country
  111.111.111.111  10101   password        aes-256-gcm     348.52  🏁 ZZ
  ```
- **Soft links**
  ```sh
  ln -s $HOME/workspace/SSS_PAC/SSS.sh $HOME/local_bin/
  ln -s $HOME/workspace/SSS_PAC/get_shadow_sockets.py $HOME/local_bin/
  sudo ln -s $HOME/workspace/SSS_PAC/blacklist.pac /var/www/html/blacklist.pac
  ```
- **Crontab**
  ```sh
  crontab -e
  # */10 6-23 * * * proxychains nc -vz google.com 80 > /dev/null 2>&1 || ( echo "\n>>>> [Restart] date: $(date)" >> $HOME/local_bin/SSS_contab.log && PATH=/opt/anaconda3/bin:$HOME/local_bin:$PATH PYTHONPATH=/opt/anaconda3/lib:$PYTHONPATH SSS.sh >> $HOME/local_bin/SSS_contab.log 2>&1 )
  ```
