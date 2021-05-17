var direct = 'DIRECT';
var proxy = "SOCKS5 127.0.0.1:8080;";
// var proxy = "SOCKS5 192.168.11.83:8080;";

var domains = {
  "10musume.com": 1,
  "12bet.com": 1,
  "12vpn.com": 1,
  "1984bbs.org": 1,
  "1pondo.tv": 1,
  "213.so": 1,
  "301works.org": 1,
  "7capture.com": 1,
  "881903.com": 1,
  "9bis.com": 1,
  "9bis.net": 1,
  "abc.pp.ru": 1,
  "abc.xyz": 1,
  "aboluowang.com": 1,
  "addictedtocoffee.de": 1,
  "adultfriendfinder.com": 1,
  "advanscene.com": 1,
  "aiweiwei.com": 1,
  "alexlur.org": 1,
  "alkasir.com": 1,
  "allinfa.com": 1,
  "amnesty.org": 1,
  "amnestyusa.org": 1,
  "anchorfree.com": 1,
  "android.com": 1,
  "anontext.com": 1,
  "anonymizer.com": 1,
  "a-normal-day.com": 1,
  "archive.org": 1,
  "areca-backup.org": 1,
  "army.mil": 1,
  "asianews.it": 1,
  "askynz.net": 1,
  "atc.org.au": 1,
  "atgfw.org": 1,
  "atlaspost.com": 1,
  "atnext.com": 1,
  "baby-kingdom.com": 1,
  "backchina.com": 1,
  "backtotiananmen.com": 1,
  "badoo.com": 1,
  "bannedbook.org": 1,
  "barenakedislam.com": 1,
  "basetimesheightdividedby2.com": 1,
  "bayvoice.net": 1,
  "bbc.com": 1,
  "bbci.co.uk": 1,
  "beeg.com": 1,
  "beijingspring.com": 1,
  "berlintwitterwall.com": 1,
  "bet365.com": 1,
  "beyondfirewall.com": 1,
  "biantailajiao.com": 1,
  "biantailajiao.in": 1,
  "bignews.org": 1,
  "bill2-software.com": 1,
  "billypan.com": 1,
  "bitcointalk.org": 1,
  "bjzc.org": 1,
  "blingblingsquad.net": 1,
  "blogblog.com": 1,
  "blogger.com": 1,
  "bloglovin.com": 1,
  "blogspot.com": 1,
  "blogspot.jp": 1,
  "blogtd.net": 1,
  "bloodshed.net": 1,
  "bloomberg.com": 1,
  "bloomfortune.com": 1,
  "boardreader.com": 1,
  "botanwang.com": 1,
  "bot.nu": 1,
  "bowenpress.com": 1,
  "boxun.com": 1,
  "boxun.tv": 1,
  "bp.blogspot.com": 1,
  "breakwall.net": 1,
  "brightkite.com": 1,
  "broadbook.com": 1,
  "budaedu.org": 1,
  "cactusvpn.com": 1,
  "cams.com": 1,
  "canyu.org": 1,
  "caochangqing.com": 1,
  "cao.im": 1,
  "cari.com.my": 1,
  "catch22.net": 1,
  "catfightpayperview.xxx": 1,
  "ccim.org": 1,
  "ccthere.com": 1,
  "cctongbao.com": 1,
  "cdjp.org": 1,
  "cdp1998.org": 1,
  "cdp2006.org": 1,
  "cdpusa.org": 1,
  "cdpweb.org": 1,
  "cecc.gov": 1,
  "centralnation.com": 1,
  "c-est-simple.com": 1,
  "cftfc.com": 1,
  "change.org": 1,
  "chaturbate.com": 1,
  "chengmingmag.com": 1,
  "chenpokong.com": 1,
  "chevronwp7.com": 1,
  "china21.org": 1,
  "china5000.us": 1,
  "chinaaffairs.org": 1,
  "chinaaid.me": 1,
  "chinaaid.net": 1,
  "chinachange.org": 1,
  "chinadigitaltimes.net": 1,
  "chinafreepress.org": 1,
  "chinagfw.org": 1,
  "chinagreenparty.org": 1,
  "chinainperspective.com": 1,
  "chinainperspective.net": 1,
  "chinainterimgov.org": 1,
  "chinalawandpolicy.com": 1,
  "chinalawtranslate.com": 1,
  "chinamule.com": 1,
  "chinarightsia.org": 1,
  "chinasocialdemocraticparty.com": 1,
  "chinatweeps.com": 1,
  "china-week.com": 1,
  "chinaworker.info": 1,
  "chinese-hermit.net": 1,
  "chinese-memorial.org": 1,
  "chinesepen.org": 1,
  "chromeadblock.com": 1,
  "chrome.com": 1,
  "chromium.org": 1,
  "circlethebayfortibet.org": 1,
  "civilhrfront.org": 1,
  "cjb.net": 1,
  "ck101.com": 1,
  "cnd.org": 1,
  "cnyes.com": 1,
  "cochina.org": 1,
  "code1984.com": 1,
  "collateralmurder.com": 1,
  "comefromchina.com": 1,
  "compython.net": 1,
  "com.uk": 1,
  "cookingtothegoodlife.com": 1,
  "cpj.org": 1,
  "crd-net.org": 1,
  "creaders.net": 1,
  "crossthewall.net": 1,
  "ctfriend.net": 1,
  "cuihua.org": 1,
  "cyberctm.com": 1,
  "cyberghostvpn.com": 1,
  "cynscribe.com": 1,
  "cytode.us": 1,
  "dabr.mobi": 1,
  "dafahao.com": 1,
  "dailymotion.com": 1,
  "dajiyuan.com": 1,
  "dalailama.com": 1,
  "deutsche-welle.de": 1,
  "deviantart.com": 1,
  "deviantart.net": 1,
  "devio.us": 1,
  "devpn.com": 1,
  "digg.com": 1,
  "directcreative.com": 1,
  "discourse-cdn.com": 1,
  "disp.cc": 1,
  "dlsite.com": 1,
  "dmcdn.net": 1,
  "dns2go.com": 1,
  "dojin.com": 1,
  "dok-forum.net": 1,
  "dongde.com": 1,
  "dongtaiwang.com": 1,
  "dongtaiwang.net": 1,
  "dontfilter.us": 1,
  "dontmovetochina.com": 1,
  "dotheyfolloweachother.com": 1,
  "dphk.org": 1,
  "dropbox.com": 1,
  "dropboxusercontent.com": 1,
  "drtuber.com": 1,
  "dtiblog.com": 1,
  "dtic.mil": 1,
  "dtiserv2.com": 1,
  "duckduckgo.com": 1,
  "dw.de": 1,
  "dwnews.com": 1,
  "dw-world.com": 1,
  "dw-world.de": 1,
  "dy24k.info": 1,
  "echofon.com": 1,
  "ecministry.net": 1,
  "edgecastcdn.net": 1,
  "edoors.com": 1,
  "efmoe.com": 1,
  "e-hentai.org": 1,
  "eic-av.com": 1,
  "elpais.com": 1,
  "enewstree.com": 1,
  "epochtimes.co.kr": 1,
  "epochtimes.com": 1,
  "epochtimes.de": 1,
  "epochtimes.fr": 1,
  "epochtimes.ie": 1,
  "epochtimes.jp": 1,
  "epochtimes-romania.com": 1,
  "epochtimes.ru": 1,
  "epochtimes.se": 1,
  "epochtimestr.com": 1,
  "epochweekly.com": 1,
  "erepublik.com": 1,
  "erights.net": 1,
  "eriversoft.com": 1,
  "e-traderland.net": 1,
  "eulam.com": 1,
  "exploader.net": 1,
  "eyespirit.info": 1,
  "eyny.com": 1,
  "facebook.com": 1,
  "falsefire.com": 1,
  "falundafamuseum.org": 1,
  "falundafa.org": 1,
  "falunhr.org": 1,
  "fangbinxing.com": 1,
  "fangongheike.com": 1,
  "fan-qiang.com": 1,
  "fanqianghou.com": 1,
  "fanqiangyakexi.net": 1,
  "faststone.org": 1,
  "fawanghuihui.org": 1,
  "fbcdn.net": 1,
  "fb.com": 1,
  "fb.me": 1,
  "fbsbx.com": 1,
  "fdc89.jp": 1,
  "feedburner.com": 1,
  "feelssh.com": 1,
  "fflick.com": 1,
  "fgmtv.net": 1,
  "fgmtv.org": 1,
  "filefactory.com": 1,
  "firebaseio.com": 1,
  "firstfivefollowers.com": 1,
  "flickr.com": 1,
  "fly4ever.me": 1,
  "fmnnow.com": 1,
  "focusvpn.com": 1,
  "fofg.org": 1,
  "footwiball.com": 1,
  "foxdie.us": 1,
  "fqrouter.com": 1,
  "freedomhouse.org": 1,
  "free-hada-now.org": 1,
  "freenet-china.org": 1,
  "freenetproject.org": 1,
  "freeopenvpn.com": 1,
  "freeoz.org": 1,
  "free-ssh.com": 1,
  "freessh.us": 1,
  "free-ss.site": 1,
  "freetibet.org": 1,
  "freeweibo.com": 1,
  "friendfeed.com": 1,
  "frontlinedefenders.org": 1,
  "fuckcnnic.net": 1,
  "fuckgfw.com": 1,
  "fuckgfw.org": 1,
  "furinkan.com": 1,
  "gaozhisheng.net": 1,
  "gardennetworks.com": 1,
  "g.co": 1,
  "gdzf.org": 1,
  "generesis.com": 1,
  "getfoxyproxy.org": 1,
  "getfreedur.com": 1,
  "getiton.com": 1,
  "getlantern.org": 1,
  "ggssl.com": 1,
  "giganews.com": 1,
  "githubassets.com": 1,
  "github-atom-io-herokuapp-com.freetls.fastly.net": 1,
  "github.blog": 1,
  "github.com": 1,
  "github1s.com": 1,
  "github-camo.com": 1,
  "globalrescue.net": 1,
  "gmail.com": 1,
  "gmodules.com": 1,
  "goagentplus.com": 1,
  "go.dev": 1,
  "godfootsteps.org": 1,
  "godoc.org": 1,
  "golang.org": 1,
  "gongmeng.info": 1,
  "gongm.in": 1,
  "gongminliliang.com": 1,
  "goodreads.com": 1,
  "goo.gl": 1,
  "google-analytics.com": 1,
  "googleapis.com": 1,
  "google.ca": 1,
  "googlecode.com": 1,
  "google.co.id": 1,
  "google.co.jp": 1,
  "google.co.kr": 1,
  "google.com": 1,
  "google.com.au": 1,
  "google.com.my": 1,
  "google.com.sg": 1,
  "google.co.uk": 1,
  "google.de": 1,
  "googledomains.com": 1,
  "googledrive.com": 1,
  "googleearth.com": 1,
  "google.fr": 1,
  "google.it": 1,
  "googlemail.com": 1,
  "google.nl": 1,
  "googleplus.com": 1,
  "googlesource.com": 1,
  "googlesyndication.com": 1,
  "googleusercontent.com": 1,
  "googlevideo.com": 1,
  "gpass1.com": 1,
  "grandtrial.org": 1,
  "great-roc.org": 1,
  "greenvpn.net": 1,
  "gstatic.com": 1,
  "guomin.us": 1,
  "gvt1.com": 1,
  "gyalwarinpoche.com": 1,
  "gzm.tv": 1,
  "h-china.org": 1,
  "hdtvb.net": 1,
  "heiyo.info": 1,
  "helloandroid.com": 1,
  "heqinglian.net": 1,
  "here4news.com": 1,
  "hidden-advent.org": 1,
  "hideipvpn.com": 1,
  "hidemyass.com": 1,
  "hikinggfw.org": 1,
  "himemix.net": 1,
  "hkbf.org": 1,
  "hkday.net": 1,
  "hkej.com": 1,
  "hkfront.org": 1,
  "hkgolden.com": 1,
  "hkgreenradio.org": 1,
  "hkhkhk.com": 1,
  "hkptu.org": 1,
  "hkzone.org": 1,
  "hnjhj.com": 1,
  "holyspiritspeaks.org": 1,
  "hongzhi.li": 1,
  "hootsuite.com": 1,
  "hotspotshield.com": 1,
  "hougaige.com": 1,
  "hqcdp.org": 1,
  "hrichina.org": 1,
  "hrw.org": 1,
  "htkou.net": 1,
  "huaglad.com": 1,
  "huanghuagang.org": 1,
  "huaren.us": 1,
  "huaxia-news.com": 1,
  "hua-yue.net": 1,
  "huping.net": 1,
  "hutianyi.net": 1,
  "hutong9.net": 1,
  "iask.bz": 1,
  "iask.ca": 1,
  "ibros.org": 1,
  "ibtimes.com": 1,
  "i-cable.com": 1,
  "icerocket.com": 1,
  "icij.org": 1,
  "idemocracy.asia": 1,
  "idiomconnection.com": 1,
  "ifanqiang.com": 1,
  "ifjc.org": 1,
  "igfw.net": 1,
  "imgur.com": 1,
  "inmediahk.net": 1,
  "instagram.com": 1,
  "interestinglaugh.com": 1,
  "interfaceaddiction.com": 1,
  "internet.org": 1,
  "ippotv.com": 1,
  "ipvanish.com": 1,
  "isgreat.org": 1,
  "istockphoto.com": 1,
  "isuntv.com": 1,
  "itaboo.info": 1,
  "itshidden.com": 1,
  "ixquick.com": 1,
  "jingpin.org": 1,
  "jkforum.net": 1,
  "jobso.tv": 1,
  "journalofdemocracy.org": 1,
  "juliereyc.com": 1,
  "junefourth-20.net": 1,
  "justfreevpn.com": 1,
  "justin.tv": 1,
  "kakao.com": 1,
  "kanzhongguo.com": 1,
  "kanzhongguo.eu": 1,
  "kat.rip": 1,
  "kcome.org": 1,
  "kenengba.com": 1,
  "keontech.net": 1,
  "killwall.com": 1,
  "kingdomsalvation.org": 1,
  "knowledgerush.com": 1,
  "kui.name": 1,
  "kun.im": 1,
  "kurtmunger.com": 1,
  "lagranepoca.com": 1,
  "laogai.org": 1,
  "laptoplockdown.com": 1,
  "lematin.ch": 1,
  "lemonde.fr": 1,
  "lerosua.org": 1,
  "lesoir.be": 1,
  "letscorp.net": 1,
  "liaowangxizang.net": 1,
  "lightyearvpn.com": 1,
  "line.me": 1,
  "linkideo.com": 1,
  "linux-engineer.net": 1,
  "listorious.com": 1,
  "liuhanyu.com": 1,
  "livestation.com": 1,
  "livestream.com": 1,
  "lockestek.com": 1,
  "logiqx.com": 1,
  "loiclemeur.com": 1,
  "lookatgame.com": 1,
  "lrip.org": 1,
  "lsxszzg.com": 1,
  "lvhai.org": 1,
  "lvv2.com": 1,
  "macrovpn.com": 1,
  "madmenunbuttoned.com": 1,
  "malaysiakini.com": 1,
  "marc.info": 1,
  "markmail.org": 1,
  "marxist.com": 1,
  "mathiew-badimon.com": 1,
  "mcfog.com": 1,
  "medium.com": 1,
  "meirixiaochao.com": 1,
  "messenger.com": 1,
  "metarthunter.com": 1,
  "mgstage.com": 1,
  "mhradio.org": 1,
  "michaelmarketl.com": 1,
  "minghui-a.org": 1,
  "minghui-b.org": 1,
  "minghui.org": 1,
  "mingjingnews.com": 1,
  "mingpaocanada.com": 1,
  "mingpao.com": 1,
  "mingpaomonthly.com": 1,
  "mirrorbooks.com": 1,
  "mitbbs.com": 1,
  "mixero.com": 1,
  "mk5000.com": 1,
  "mmaaxx.com": 1,
  "mobile01.com": 1,
  "mog.com": 1,
  "molihua.org": 1,
  "monova.to": 1,
  "mooo.com": 1,
  "morningsun.org": 1,
  "mpfinance.com": 1,
  "mrtweet.com": 1,
  "msguancha.com": 1,
  "mtw.tl": 1,
  "myfreshnet.com": 1,
  "my-proxy.com": 1,
  "naacoalition.org": 1,
  "nanyang.com": 1,
  "ndr.de": 1,
  "ned.org": 1,
  "neverforget8964.org": 1,
  "new-3lunch.net": 1,
  "newcenturymc.com": 1,
  "newspeak.cc": 1,
  "newstapa.org": 1,
  "nextmedia.com": 1,
  "nicovideo.jp": 1,
  "njactb.org": 1,
  "nlfreevpn.com": 1,
  "noobbox.com": 1,
  "nownews.com": 1,
  "nrk.no": 1,
  "ntdtv.ca": 1,
  "ntdtv.ru": 1,
  "nuvid.com": 1,
  "nyaa.se": 1,
  "nydus.ca": 1,
  "nytimes.com": 1,
  "observechina.net": 1,
  "oizoblog.com": 1,
  "okayfreedom.com": 1,
  "omnitalk.com": 1,
  "onedrive.live.com": 1,
  "onmoon.com": 1,
  "onmoon.net": 1,
  "ontrac.com": 1,
  "opendemocracy.net": 1,
  "openvpn.net": 1,
  "orientaldaily.com.my": 1,
  "oulove.org": 1,
  "oursogo.com": 1,
  "oursteps.com.au": 1,
  "ovi.com": 1,
  "packetix.net": 1,
  "palacemoon.com": 1,
  "pandora.tv": 1,
  "panluan.net": 1,
  "panoramio.com": 1,
  "pao-pao.net": 1,
  "paperb.us": 1,
  "path.com": 1,
  "pbwiki.com": 1,
  "pdproxy.com": 1,
  "peacefire.org": 1,
  "peacehall.com": 1,
  "penthouse.com": 1,
  "perfectvpn.net": 1,
  "pign.net": 1,
  "pinterest.com": 1,
  "pixnet.net": 1,
  "plusbb.com": 1,
  "pokerstars.com": 1,
  "popyard.com": 1,
  "popyard.org": 1,
  "porn.com": 1,
  "porntube.com": 1,
  "post852.com": 1,
  "powerapple.com": 1,
  "privateinternetaccess.com": 1,
  "privatetunnel.com": 1,
  "proxy.org": 1,
  "psblog.name": 1,
  "psiphon.ca": 1,
  "ptt.cc": 1,
  "puffinbrowser.com": 1,
  "puffstore.com": 1,
  "purevpn.com": 1,
  "qi-gong.me": 1,
  "qiwen.lu": 1,
  "quoracdn.net": 1,
  "quora.com": 1,
  "qvodzy.org": 1,
  "qxbbs.org": 1,
  "rangzen.org": 1,
  "ranyunfei.com": 1,
  "raw.githubusercontent.com": 1,
  "rcinet.ca": 1,
  "readmoo.com": 1,
  "realraptalk.com": 1,
  "redd.it": 1,
  "reddit.com": 1,
  "redditmedia.com": 1,
  "redditstatic.com": 1,
  "redtube.com": 1,
  "referer.us": 1,
  "renminbao.com": 1,
  "renyurenquan.org": 1,
  "retweeteffect.com": 1,
  "reuters.com": 1,
  "rfachina.com": 1,
  "rfamobile.org": 1,
  "rfa.org": 1,
  "rferl.org": 1,
  "rfi.fr": 1,
  "riku.me": 1,
  "rmjdw.com": 1,
  "rockmelt.com": 1,
  "rocmp.org": 1,
  "rotten.com": 1,
  "rsf-chinese.org": 1,
  "rsf.org": 1,
  "rutube.ru": 1,
  "ruyiseek.com": 1,
  "s1heng.com": 1,
  "sapikachu.net": 1,
  "savetibet.de": 1,
  "savetibet.nl": 1,
  "savetibet.org": 1,
  "savetibet.ru": 1,
  "scmp.com": 1,
  "search.com": 1,
  "secretchina.com": 1,
  "securitykiss.com": 1,
  "sejie.com": 1,
  "sendspace.com": 1,
  "sesawe.org": 1,
  "sevenload.com": 1,
  "sex8.cc": 1,
  "sexhuang.com": 1,
  "shadowsocks.org": 1,
  "sharebee.com": 1,
  "share.dmhy.org": 1,
  "shellmix.com": 1,
  "shenyunperformingarts.org": 1,
  "shenzhoufilm.com": 1,
  "shixiao.org": 1,
  "simplecd.org": 1,
  "sinocast.com": 1,
  "sinopitt.info": 1,
  "sinoquebec.com": 1,
  "sis001.com": 1,
  "site90.net": 1,
  "slickvpn.com": 1,
  "slideshare.net": 1,
  "slutload.com": 1,
  "smhric.org": 1,
  "softether.co.jp": 1,
  "softwarebychuck.com": 1,
  "sohcradio.com": 1,
  "sohfrance.org": 1,
  "somee.com": 1,
  "soundcloud.com": 1,
  "soundofhope.org": 1,
  "space-scape.com": 1,
  "sparrowmailapp.com": 1,
  "spb.com": 1,
  "ssh91.com": 1,
  "stackpathcdn.com": 1,
  "startpage.com": 1,
  "state168.com": 1,
  "sthoo.com": 1,
  "storify.com": 1,
  "strongvpn.com": 1,
  "studentsforafreetibet.org": 1,
  "stuffimreading.com": 1,
  "stuffimreading.net": 1,
  "suoluo.org": 1,
  "sydneytoday.com": 1,
  "syx86.com": 1,
  "t35.com": 1,
  "t66y.com": 1,
  "taiwandaily.net": 1,
  "taiwantp.net": 1,
  "taiwanus.net": 1,
  "tbpic.info": 1,
  "tbsn.org": 1,
  "tbsseattle.org": 1,
  "tchrd.org": 1,
  "t.co": 1,
  "techparaiso.com": 1,
  "telegram.org": 1,
  "tensorflow-dot-devsite-v2-prod-3p.appspot.com": 1,
  "tensorflow.org": 1,
  "tfhub.dev": 1,
  "thechinastory.org": 1,
  "thehots.info": 1,
  "thelius.org": 1,
  "thepiratebay.org": 1,
  "theqii.info": 1,
  "thereallove.kr": 1,
  "thestandnews.com": 1,
  "thetibetpost.com": 1,
  "thevivekspot.com": 1,
  "thinkingtaiwan.com": 1,
  "thisav.com": 1,
  "thisiswhyyouarefat.com": 1,
  "thumbzilla.com": 1,
  "tiananmenuniv.com": 1,
  "tiandixing.org": 1,
  "tiantibooks.org": 1,
  "tibet.at": 1,
  "tibet.com": 1,
  "tibetcorps.org": 1,
  "tibetfund.org": 1,
  "tibetjustice.org": 1,
  "tibet.net": 1,
  "tibetoffice.org": 1,
  "tibetonline.com": 1,
  "tibetsun.com": 1,
  "time.com": 1,
  "tistory.com": 1,
  "tkforum.tk": 1,
  "tnaflix.com": 1,
  "togetter.com": 1,
  "topify.com": 1,
  "torproject.org": 1,
  "torrentz2.eu": 1,
  "torvpn.com": 1,
  "transgressionism.org": 1,
  "transparency.org": 1,
  "trendsmap.com": 1,
  "trialofccp.org": 1,
  "trouw.nl": 1,
  "trulyergonomic.com": 1,
  "tsquare.tv": 1,
  "tsunagarumon.com": 1,
  "tttan.com": 1,
  "tube8.com": 1,
  "tubewolf.com": 1,
  "tuidang.org": 1,
  "tuitui.info": 1,
  "tumblr.com": 1,
  "tunnelbear.com": 1,
  "turbobit.net": 1,
  "turbotwitter.com": 1,
  "tvboxnow.com": 1,
  "tvider.com": 1,
  "tweeplike.me": 1,
  "tweetdeck.com": 1,
  "tweetrans.com": 1,
  "twftp.org": 1,
  "twibble.de": 1,
  "twicsy.com": 1,
  "twilog.org": 1,
  "twimbow.com": 1,
  "twimg.com": 1,
  "twitcause.com": 1,
  "twitlonger.com": 1,
  "twitpic.com": 1,
  "twitreferral.com": 1,
  "twitter.com": 1,
  "twittercounter.com": 1,
  "twittergadget.com": 1,
  "twitter.jp": 1,
  "twitturk.com": 1,
  "twstar.net": 1,
  "twt.fm": 1,
  "twtrland.com": 1,
  "twt.tl": 1,
  "twttr.com": 1,
  "twyac.org": 1,
  "ucdc1998.org": 1,
  "udn.com": 1,
  "ufreevpn.com": 1,
  "uhrp.org": 1,
  "uk.to": 1,
  "ultravpn.fr": 1,
  "ultraxs.com": 1,
  "unblock.cn.com": 1,
  "unholyknight.com": 1,
  "urlparser.com": 1,
  "ustream.tv": 1,
  "utom.us": 1,
  "uwants.com": 1,
  "uyghuramerican.org": 1,
  "uyghurcongress.org": 1,
  "v2ex.com": 1,
  "v7976888.info": 1,
  "vansky.com": 1,
  "vatn.org": 1,
  "veempiire.com": 1,
  "vegorpedersen.com": 1,
  "views.fm": 1,
  "vimeo.com": 1,
  "visiontimes.com": 1,
  "voacantonese.com": 1,
  "voachinese.com": 1,
  "voanews.com": 1,
  "voatibetan.com": 1,
  "vot.org": 1,
  "voy.com": 1,
  "vpnbook.com": 1,
  "vpncup.com": 1,
  "vpnfire.com": 1,
  "vpngate.jp": 1,
  "vpngate.net": 1,
  "vpnpop.com": 1,
  "v-state.org": 1,
  "vtunnel.com": 1,
  "waffle1999.com": 1,
  "waigaobu.com": 1,
  "waiwaier.com": 1,
  "wallornot.org": 1,
  "wangruoshui.net": 1,
  "waselpro.com": 1,
  "washeng.net": 1,
  "wattpad.com": 1,
  "webmproject.org": 1,
  "weeewooo.net": 1,
  "weekmag.info": 1,
  "weiboleak.com": 1,
  "weigegebyc.dreamhosters.com": 1,
  "weijingsheng.org": 1,
  "weiming.info": 1,
  "wellplacedpixels.com": 1,
  "wengewang.org": 1,
  "wenhui.ch": 1,
  "wenxuecity.com": 1,
  "wepn.info": 1,
  "wexiaobo.org": 1,
  "wezhiyong.org": 1,
  "wforum.com": 1,
  "whydidyoubuymethat.com": 1,
  "wikibooks.org": 1,
  "wikileaks.de": 1,
  "wikileaks.org": 1,
  "wikimapia.org": 1,
  "wikimedia.org": 1,
  "wikimedia.org.mo": 1,
  "wikinews.org": 1,
  "wikipedia.org": 1,
  "wikisource.org": 1,
  "windowsphoneme.com": 1,
  "winwhispers.info": 1,
  "woeser.com": 1,
  "woesermiddle-way.net": 1,
  "womensrightsofchina.org": 1,
  "workatruna.com": 1,
  "worldcat.org": 1,
  "worldjournal.com": 1,
  "worstthingieverate.com": 1,
  "wo.tc": 1,
  "wow-life.net": 1,
  "wqyd.org": 1,
  "wrchina.org": 1,
  "wsj.com": 1,
  "wsj.net": 1,
  "wuguoguang.com": 1,
  "wujieliulan.com": 1,
  "wujie.net": 1,
  "wukangrui.net": 1,
  "xanga.com": 1,
  "x-berry.com": 1,
  "xbookcn.com": 1,
  "xcafe.in": 1,
  "xh4n.cn": 1,
  "xhamster.com": 1,
  "xiezhua.com": 1,
  "xxxx.com.au": 1,
  "xys.org": 1,
  "yeeyi.com": 1,
  "yegle.net": 1,
  "yhcw.net": 1,
  "yi.org": 1,
  "youjizz.com": 1,
  "youmaker.com": 1,
  "youpai.org": 1,
  "yourepeat.com": 1,
  "your-freedom.net": 1,
  "youtu.be": 1,
  "youtubecn.com": 1,
  "youtube.com": 1,
  "youtube-nocookie.com": 1,
  "yuanming.net": 1,
  "yyii.org": 1,
  "yzzk.com": 1,
  "zacebook.com": 1,
  "zeutch.com": 1,
  "zhenlibu.info": 1,
  "zhinengluyou.com": 1,
  "zhongguotese.net": 1,
  "zhreader.com": 1,
  "zhuichaguoji.org": 1,
  "zmw.cn": 1,
  "zoozle.net": 1,
  "zsrhao.com": 1,
  "zyzc9.com": 1,
};

var hasOwnProperty = Object.hasOwnProperty;

function FindProxyForURL(url, host) {
    var suffix;
    var pos = host.lastIndexOf('.');
    while(1) {
        suffix = host.substring(pos + 1);
        if (hasOwnProperty.call(domains, suffix)) {
            return proxy;
        }
        if (pos <= 0) {
            break;
        }
        pos = host.lastIndexOf('.', pos - 1);
    }
    return direct;
}
