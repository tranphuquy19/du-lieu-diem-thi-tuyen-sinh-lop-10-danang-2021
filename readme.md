# Crawler tra cứu điểm thi lớp 10 thành phố Đà Nẵng

`results.csv.cpt`: File danh sách điểm thi của ~13k thí sinh thi tuyển sinh lớp 10 tại TP. Đà Nẵng năm 2021

## Crawling

```bash
npm install
npm start
```

## Giải mã (decrypt)

```bash
# sudo apt install ccrypt
ccdecrypt results.csv.cpt
```

## Mã hóa (encrypt)

```bash
ccencrypt results.csv
```