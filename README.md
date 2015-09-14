# bom

## 環境構築

```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ sudo vi /etc/paths
/usr/bin
/bin
/usr/sbin
/sbin
/usr/local/bin
->
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin

$ vim ~/.bashrc
#======================
# rbnev
#======================
if which rbenv > /dev/null; then
  #export PATH="$HOME/.rbenv/bin:$PATH"
  eval "$(rbenv init -)"
fi

$ brew install rbenv ruby-build git open-ssl readline libyaml
$ rbenv install 2.2.2
$ rbenv local 2.2.2
$ rbenv rehash

$ rbenv exec gem install bundler
```

## ローカル環境でrailsを走らせるための環境構築

http://qiita.com/syougun360/items/013229aeddec08121474

```sh
$ git clone git@github.com:yorisilo/bom.git
$ bundle install --path vendor/bundle

$ bundle exec rails s
で rails が動くか確認する
```

## SourceTree にリポジトリを追加
1. Sourcetreeを開く
2. ファイル→開く でcloneしたフォルダを指定
3. おしまい！