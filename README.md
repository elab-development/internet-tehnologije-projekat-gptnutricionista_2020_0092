# KORISNICKI ZAHTEV
 Aplikacija GPT NUTRI APP, razvijena kao deo seminarskog rada, koristi kombinaciju modernih tehnologija kao što su Laravel za backend i React za frontend. Cilj aplikacije je pružanje korisnicima alata za praćenje unosa hrane i vode, kao i generisanje personalizovanih planova ishrane uz pomoć OpenAI GPT-3.5 modela. U nastavku se detaljno opisuje aplikacija na osnovu dokumentacije i korisničkog uputstva.
Funkcionalnosti aplikacije
1. Registracija i Prijava
Korisnici se mogu registrovati i prijaviti putem jednostavnog korisničkog interfejsa. Prilikom registracije, korisnik unosi osnovne podatke kao što su ime, email i lozinka. Nakon uspešne registracije, korisnik može da se prijavi koristeći iste podatke. Ako je korisnik admin, prikazuje mu se posebna administrativna kontrolna tabla.
2. Administrativna kontrolna tabla
Administrativna kontrolna tabla omogućava administratorima pregled ključnih statistika aplikacije, kao što su:
•	Ukupan broj korisnika
•	Broj novih korisnika u poslednjih 30 dana
•	Broj novih korisnika u poslednjih 7 dana
•	Grafikon koji prikazuje broj novih korisnika po mesecima
Ove informacije su predstavljene pomoću ikona i grafikona, što olakšava praćenje korisničkog rasta.
3. Pregled sastojaka hrane
Korisnici mogu pregledati razne vrste hrane i njihove nutritivne vrednosti koje su učitane sa spoljnog API-ja. Na ovoj stranici, korisnici mogu pretraživati sastojke po nazivu, kao i sortirati ih po raznim kriterijumima. Implementirana je paginacija kako bi se olakšalo snalaženje među velikim brojem sastojaka.
4. Moj Profil - Pregled unosa
Na stranici "Moj Profil", korisnici mogu pregledati svoje unose hrane i vode. Unosi su prikazani hronološki, sa mogućnošću brisanja ili ažuriranja unosa. Ova funkcionalnost omogućava korisnicima da prate svoje prehrambene navike i unos vode tokom vremena.
5. Dodavanje Unosa Hrane i Vode
Korisnici mogu dodavati nove unose hrane i vode putem jednostavnih formi. Unos hrane uključuje podatke kao što su tip obroka, kalorije, opis, datum i vreme unosa. Unos vode uključuje količinu vode, datum i vreme unosa. Nakon unosa podataka, korisnik može sačuvati unos klikom na dugme.
6. Generisanje Plana Ishrane
Jedna od najnaprednijih funkcionalnosti aplikacije je mogućnost generisanja personalizovanog plana ishrane uz pomoć GPT-3.5 modela. Korisnik unosi podatke kao što su period za koji je plan potreban, prehrambene preferencije, kalorijski unos, visina, trenutna težina, željena težina, nivo aktivnosti, godine i pol. Na osnovu ovih podataka, aplikacija generiše detaljan plan ishrane koji uključuje recepte, listu sastojaka i nutritivne vrednosti za svaki obrok.

# POKRETANJE APP 
  cd laravelApp
  
  php artisan serve
  
  php artisan migrate:fresh --seed

  

  cd reactprojekat
  
  npm start







