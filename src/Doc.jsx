"use client";
import React from "react";
import styles from "./page.module.css";
import InputDropDown from "./InputDropDown";

function Doc() {
  const inputReference = React.useRef(null);
  const [isDoc, setIsDoc] = React.useState(false);
  const today = new Date();
  let day = today.getDate();
  const year = today.getFullYear();
  let month = today.getMonth();

  const [docData, setDocData] = React.useState({
    Uin: "",
    fio: "",
    fioNar: "",
    fioOwner: "",
    addressZapolneniya: "",
    ts: "",
    gn: "",
    phone: "",
    addressSostav: "",
    regAddress: "",
    factAddress: "",
    checkAddress: true,
    checkOwner: true,
    birthDate: "",
    birthArea: "",
    whereFrom: "",
    article: "12.16",
    part: "4",
    rusLang: "владеет",
    driverCardFrom: "",
    driverCard: "",
    work: "",
    driverCategory: "",
    narDay: "",
    narMonth: "",
    narYear: "",
    narHour: "",
    narMinute: "",
    smag: "имеются",
    otag: "имеются",
  });

  const articles = [
    {
      name: "12.16",
      parts: [
        {
          name: "4",
          description:
            "водитель управляя транспортным средством допустил стоянку транспортного средства в зоне действия дорожного знака 3.2 с табличкой 8.24 ПДД РФ",
          pdd: "1.3, 12.4",
          price: 1500,
          priceDescription: "одна тысяча пятьсот",
        },
      ],
    },
    {
      name: "12.19",
      parts: [
        {
          name: "2",
          description:
            "водитель управляя транспортным средством совершил остановку транспортного средства в месте остановки и стоянки транспортных средств инвалидов, обозначенного дорожным знаком 6.4 и табличкой 8.17",
          pdd: "1.3",
          price: 5000,
          priceDescription: "пять тысяч",
        },
        {
          name: "3",
          description:
            "водитель управляя транспортным средством совершил стоянку транспортного средства на пешеходном переходе, обозначенного дорожными знаками 5.19.1 и 5.19.2 ПДД РФ или ближе 5 метров перед ним",
          pdd: "12.4",
          price: 1000,
          priceDescription: "одна тысяча",
        },
        {
          name: "3.1",
          description:
            "водитель управляя транспортным средством совершил остановку трансопртного средства на расстоянии менее 15 м. от остановки маршрутных трансопртных средств, обозначенной дорожным знаком 5.16 ПДД РФ",
          pdd: "12.4",
          price: 1000,
          priceDescription: "одна тысяча",
        },
        {
          name: "3.2",
          description:
            "водитель управляя транспортным средством допустил стоянку транспортного средства далее первого ряда от края проезжей части",
          pdd: "1.3, 12.2",
          price: 1500,
          priceDescription: "одна тысяча пятьсот",
        },
        {
          name: "4",
          description:
            "водитель управляя транспортным средством допустил стоянку транспортного средства на проездей части, чем создал препятствие для движения других транспортных средств",
          pdd: "12.4",
          price: 2000,
          priceDescription: "две тысячи",
        },
      ],
    },
  ];

  function changeDocDataInfo(e) {
    setDocData({ ...docData, [e.target.name]: e.target.value });
  }
  if (day < 10) {
    day = `0${day}`;
  }

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  month = monthNames[month];

  function focusNext(index) {
    inputReference.current.children[index + 1].focus();
  }
  function focusPrevious(index) {
    inputReference.current.children[index - 1].focus();
  }

  const ThirtyEightInputs = () => {
    const nums = [...Array(38).keys()];
    return nums.map((x, i) => {
      return (
        <input
          value={docData.fioNar[i]}
          key={i}
          onChange={(event) =>
            event.nativeEvent.inputType == "deleteContentBackward"
              ? focusPrevious(i)
              : focusNext(i)
          }
          className={styles.digit}
          size={1}
          type="text"
          maxLength="1"
        />
      );
    });
  };

  const Article = () => {
    return (
      <select
        name="article"
        value={docData.article}
        onChange={changeDocDataInfo}
      >
        {articles.map((article, i) => {
          return (
            <option value={article.name} key={i}>
              {article.name}
            </option>
          );
        })}
      </select>
    );
  };

  const Part = () => {
    return (
      <select name="part" value={docData.part} onChange={changeDocDataInfo}>
        {articles[
          articles.findIndex((article) => article.name === docData.article)
        ].parts.map((part, i) => {
          return (
            <option value={part.name} key={i}>
              {part.name}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <>
      {isDoc ? (
        <div className={styles.docBody}>
          <header>
            <div className={styles.heading}>
              <b>
                Номер УИН 188100
                <InputDropDown
                  name="Uin"
                  value={docData.Uin}
                  onChange={changeDocDataInfo}
                  width={14}
                />{" "}
                <br />
                ПОСТАНОВЛЕНИЕ <br />
                по делу административном правонарушении
              </b>
            </div>

            <div className={styles.aboutMe}>
              «{day}» {month} {year}г. г.Ростов-на-Дону ул.
              <InputDropDown
                name="addressSostav"
                value={docData.addressSostav}
                onChange={changeDocDataInfo}
                width={40}
                data={JSON.parse(localStorage.getItem("address"))}
              />
              <br />
              Я,
              <InputDropDown
                value={docData.fio.slice(0, 100)}
                onChange={changeDocDataInfo}
                width={86}
                data={JSON.parse(localStorage.getItem("fio"))}
                name="fio"
              />
              {docData.fio.length > 86 ? (
                <InputDropDown
                  value={docData.fio.slice(86)}
                  width={88}
                  onChange={changeDocDataInfo}
                  data={JSON.parse(localStorage.getItem("fio"))}
                  name="fio"
                />
              ) : null}
              <div style={{ fontSize: "12pt" }}>
                рассмотрев обстоятельства совершения административного
                правонарушения установил, что гражданин (ка)
              </div>
            </div>
          </header>

          <main>
            <div className={styles.condition}>
              <div ref={inputReference} className={styles.digits}>
                <ThirtyEightInputs />
              </div>
              ​
              <div className={styles.fio}>
                <div className={styles.fioChild}>фамилия</div>{" "}
                <div className={styles.fioChild}>​имя</div>{" "}
                <div className={styles.fioChild}>​отчество</div>
              </div>{" "}
              <br />
              <InputDropDown
                name="birthDate"
                value={docData.birthDate}
                onChange={changeDocDataInfo}
              />
              Место рождения
              <InputDropDown
                name="birthArea"
                value={docData.birthArea}
                onChange={changeDocDataInfo}
                width={52}
              />
              <br />
              русским языком
              <InputDropDown
                name="rusLang"
                value={docData.rusLang}
                onChange={changeDocDataInfo}
                width={9}
              />
              Гражданство
              <InputDropDown
                name="whereFrom"
                value={docData.whereFrom}
                onChange={changeDocDataInfo}
                width={46}
              />
              <br />
              водительское удостоверение (документ, удостоверяющий личность)
              <InputDropDown
                name="driverCard"
                value={docData.driverCard}
                onChange={changeDocDataInfo}
                width={14}
              />
              от
              <InputDropDown
                name="driverCardFrom"
                value={docData.driverCardFrom}
                onChange={changeDocDataInfo}
                width={14}
              />{" "}
              зарегистрированный (ая) по месту жительства/пребывания{" "}
              <InputDropDown
                name="regAddress"
                value={docData.regAddress}
                onChange={changeDocDataInfo}
                width={88}
              />
              <br />
              фактически проживающий (ая){" "}
              {!docData.checkAddress ? (
                <InputDropDown
                  name="regAddress"
                  value={docData.regAddress}
                  onChange={changeDocDataInfo}
                  width={88}
                />
              ) : (
                <InputDropDown
                  name="factAddress"
                  value={docData.factAddress}
                  onChange={changeDocDataInfo}
                  width={88}
                />
              )}
              {/* <br/> <InputDropDown width={50}/> */}
              тел.8-{" "}
              <InputDropDown
                name="phone"
                value={docData.phone}
                onChange={changeDocDataInfo}
                width={10}
              />
              работающий (ая)/служащий (ая)
              <InputDropDown
                name="work"
                value={docData.work}
                onChange={changeDocDataInfo}
                width={60}
              />
              управляя транспортным средством
              <InputDropDown
                name="ts"
                value={docData.ts}
                onChange={changeDocDataInfo}
                width={30}
              />
              г\н{" "}
              <InputDropDown
                name="gn"
                value={docData.gn}
                onChange={changeDocDataInfo}
                width={18}
              />
              принадлежащим{" "}
              {!docData.checkOwner ? (
                <InputDropDown
                  name="fioNar"
                  value={docData.fioNar}
                  onChange={changeDocDataInfo}
                  width={88}
                />
              ) : (
                <InputDropDown
                  name="fioOwner"
                  value={docData.fioOwner}
                  onChange={changeDocDataInfo}
                  width={88}
                />
              )}{" "}
              категории «
              <InputDropDown
                name="driverCategory"
                value={docData.driverCategory}
                onChange={changeDocDataInfo}
                width={2}
              />
              » «
              <InputDropDown
                name="narDay"
                value={docData.narDay}
                onChange={changeDocDataInfo}
                width={2}
              />
              »
              <InputDropDown
                name="narMonth"
                value={docData.narMonth}
                onChange={changeDocDataInfo}
                width={8}
              />
              <InputDropDown
                name="narYear"
                value={docData.narYear}
                onChange={changeDocDataInfo}
                width={4}
              />
              г. в
              <InputDropDown
                name="narHour"
                value={docData.narHour}
                onChange={changeDocDataInfo}
                width={2}
              />{" "}
              ч.
              <InputDropDown
                name="narMinute"
                value={docData.narMinute}
                onChange={changeDocDataInfo}
                width={2}
              />{" "}
              мин г.Ростов-на-Дону ул.
              <InputDropDown
                name="addressZapolneniya"
                value={docData.addressZapolneniya}
                onChange={changeDocDataInfo}
                width={63}
              />
              <div style={{ fontSize: "12pt" }}>
                <InputDropDown
                  value={articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].description.slice(0, 88)}
                  width={88}
                />
                {articles[
                  articles.findIndex(
                    (article) => article.name === docData.article
                  )
                ].parts[
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts.findIndex((part) => part.name === docData.part)
                ].description.length > 88 ? (
                  <InputDropDown
                    value={articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts[
                      articles[
                        articles.findIndex(
                          (article) => article.name === docData.article
                        )
                      ].parts.findIndex((part) => part.name === docData.part)
                    ].description.slice(88)}
                    width={88}
                  />
                ) : null}
                , чем нарушил(а) требования п.п.
                <InputDropDown
                  value={
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts[
                      articles[
                        articles.findIndex(
                          (article) => article.name === docData.article
                        )
                      ].parts.findIndex((part) => part.name === docData.part)
                    ].pdd
                  }
                />{" "}
                ПДД РФ, т.е. совершил (а) административное правонарушение,
                предусмотренное частью
                <InputDropDown
                  value={
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts[
                      articles[
                        articles.findIndex(
                          (article) => article.name === docData.article
                        )
                      ].parts.findIndex((part) => part.name === docData.part)
                    ].name
                  }
                  width={5}
                />{" "}
                статьи (ей)
                <InputDropDown
                  value={
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].name
                  }
                />{" "}
                Кодекса Российской Федерации об административных
                правонарушениях/Закон субъекта РФ, предусматривающих
                административную ответственность за совершение административного
                правонарушения/основания прекращения производства по делу.
                <br />
                При наличии указать соответствующий пункт части 1 ст.4.2 КоАП
                РФ, и части 1 ст.4.3 КоАП РФ.
                <br />
                обстоятельства, смягчающие административную ответственность{" "}
                <InputDropDown
                  name="smag"
                  value={docData.smag}
                  onChange={changeDocDataInfo}
                  width={10}
                />
                <br />
                обстоятельства, отягчающие административную ответственность{" "}
                <InputDropDown
                  name="otag"
                  value={docData.otag}
                  onChange={changeDocDataInfo}
                  width={10}
                />
                <br />
                На основании нижеизложенного, учитывая
                ст.4.1;4.2;4.3;24.1;26.1;29.1, и руководствуясь ст.24.1, 26.1,
                28.6, 29.9, 29.10 Кодекса РФ об АП
              </div>
            </div>
            <div className={styles.solution}>
              <center>
                <h4 style={{ margin: "20px 0" }}>ПОСТАНОВИЛ</h4>
              </center>
              Признать гражданина(ку)
              <InputDropDown
                name="fioNar"
                value={docData.fioNar}
                onChange={changeDocDataInfo}
                width={88}
              />
              <br />
              Виновным (ой) в совершении п.п.{" "}
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].pdd
                }
              />{" "}
              ПДД РФ, ответственность за которое предусмотрена ч.
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].name
                }
                width={5}
              />
              ст.
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].name
                }
              />{" "}
              КРФ об АП, наложить административный штраф в размере
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].price
                }
                width={7}
              />
              (
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].priceDescription
                }
                width={50}
              />
              ) рублей,
              {/* <InputDropDown/> копеек */}
              <br />С нарушением согласен. События административного
              правонарушения и назначенное наказание не оспариваю ٧
              <InputDropDown />
              Лицу, в отношении которого возбуждено дело об административном
              правонарушении, права, предусмотренные статьей 25.1 Кодекса РФ об
              административных правонарушениях и ст.51 Конституцией РФ
              разъяснены ٧<InputDropDown /> Право, порядок и сроки обжалования
              постановления по делу, предусмотренные статьями 30.1, 30.2, 30.3
              Кодекса РФ об Административных правонарушениях, разъяснены ٧
              <InputDropDown />
              Положения статьи 32.2 Кодекса РФ об административных
              правонарушениях, предусматривающие уплату административного штрафа
              не позднее 60 дней со дня вступления постановления в законную
              силу, и статьи 20.25 Кодекса РФ об административных
              правонарушениях, предусматривающие обязанность за неуплату
              административного штрафа в установленный срок, части 11 ст. 27.13
              КоАП РФ, предусматривающие обязанность по уплате стоимости
              перемещения постановления административный штраф может быть
              уплачен в размере половины суммы, а именно в размере
              <InputDropDown
                value={
                  articles[
                    articles.findIndex(
                      (article) => article.name === docData.article
                    )
                  ].parts[
                    articles[
                      articles.findIndex(
                        (article) => article.name === docData.article
                      )
                    ].parts.findIndex((part) => part.name === docData.part)
                  ].price / 2
                }
              />{" "}
              рублей, за исключением ч 1.1 ст. 12.1, 12.8, ч.ч. 6.7 ст 12.9, ч 3
              ст. 12.12 ч. 5 ст. 12.15, ч. 3.1 ст. 12.16, 12.24, ч. 3 ст. 12.27
              КоАП РФ ٧<InputDropDown />
              <br />
              Копию постановления получил(а) «{day}» {month} 2023г. ٧
              <InputDropDown />
            </div>
          </main>

          <footer>
            <div className={styles.conclusion}>
              Должностное лицо, вынесшее постановление по делу:
              <InputDropDown
                name="fio"
                value={docData.fio}
                onChange={changeDocDataInfo}
              />
              <br />
              Дата вступления в законную силу «<InputDropDown width={2} />»{" "}
              <InputDropDown />
              2023г. <InputDropDown />
              <br />
              Информация о получателе штрафа, необходимая в соответствии с
              правилами заполнения расчетных документов на перечисление суммы
              административного штрафа, сведения о вручении бланка платежного
              документа, содержащего указанную информацию (в случае наложения
              административного штрафа)
              <br />
              Реквизиты на уплату административного штрафа получил ٧
              <InputDropDown />
            </div>
            <div className={styles.formalData}>
              <p>Наименование получателя:</p>
              <p>УФК по Ростовской области (ГУ МВД России по</p>
              <p> Ростовской области) Счет № 03100643000000015800</p>
              <p>
                {" "}
                Банк получателя: ОТДЕЛЕНИЕ РОСТОВ-НА-ДОНУ//УФК по Ростовской
                области
              </p>
              <p> г. Ростов-на-Дону Счет № 40102810845370000050</p>
              <p>БИК 016015102 ИНН 6164049013</p>
              <p>ОКТМО 60701000 КПП 616401001 КБК 18811601121010001140</p>
            </div>
          </footer>
        </div>
      ) : (
        <div className={styles.docBody}>
          УИН 188100{" "}
          <InputDropDown
            name="Uin"
            value={docData.Uin}
            onChange={changeDocDataInfo}
            width={14}
          />
          <br />
          Адрес составления{" "}
          <InputDropDown
            name="addressSostav"
            value={docData.addressSostav}
            onChange={changeDocDataInfo}
            width={40}
            data={JSON.parse(localStorage.getItem("address"))}
          />
          <br />
          Сотрудник{" "}
          <InputDropDown
            name="fio"
            value={docData.fio}
            onChange={changeDocDataInfo}
            width={124}
            data={JSON.parse(localStorage.getItem("fio"))}
          />
          <br />
          <br />
          Нарушитель:
          <br />
          Фамилия Имя Отчество{" "}
          <InputDropDown
            name="fioNar"
            value={docData.fioNar}
            onChange={changeDocDataInfo}
            width={38}
          />
          <br />
          Дата рождения{" "}
          <InputDropDown
            name="birthDate"
            value={docData.birthDate}
            onChange={changeDocDataInfo}
          />
          <br />
          Место рождения{" "}
          <InputDropDown
            name="birthArea"
            value={docData.birthArea}
            onChange={changeDocDataInfo}
            width={84}
          />
          <br />
          Русским языком{" "}
          <select
            name="rusLang"
            value={docData.rusLang}
            onChange={changeDocDataInfo}
          >
            <option>владеет</option>
            <option>не владеет</option>
          </select>{" "}
          <br />
          Гражданство{" "}
          <InputDropDown
            name="whereFrom"
            value={docData.whereFrom}
            onChange={changeDocDataInfo}
            width={67}
          />
          <br />
          Водительское удостоверение{" "}
          <InputDropDown
            name="driverCard"
            value={docData.driverCard}
            onChange={changeDocDataInfo}
            width={14}
          />
          от{" "}
          <InputDropDown
            name="driverCardFrom"
            value={docData.driverCardFrom}
            onChange={changeDocDataInfo}
            width={14}
          />
          <br />
          Зарегистрированный по месту{" "}
          <InputDropDown
            name="regAddress"
            value={docData.regAddress}
            onChange={changeDocDataInfo}
            width={88}
          />
          <br />
          Такой же адрес{" "}
          <input
            type="checkbox"
            name="checkAddress"
            value={docData.checkAddress}
            onChange={() =>
              setDocData({
                ...docData,
                ["checkAddress"]: !docData.checkAddress,
              })
            }
          />{" "}
          <br />
          Фактически проживающий{" "}
          {!docData.checkAddress ? (
            <InputDropDown
              name="regAddress"
              value={docData.regAddress}
              onChange={changeDocDataInfo}
              width={88}
            />
          ) : (
            <InputDropDown
              name="factAddress"
              value={docData.factAddress}
              onChange={changeDocDataInfo}
              width={88}
            />
          )}
          <br />
          Телефон 8-{" "}
          <InputDropDown
            name="phone"
            value={docData.phone}
            onChange={changeDocDataInfo}
            width={10}
          />
          <br />
          Работающий{" "}
          <InputDropDown
            name="work"
            value={docData.work}
            onChange={changeDocDataInfo}
            width={60}
          />
          <br />
          Транспортное средство{" "}
          <InputDropDown
            name="ts"
            value={docData.ts}
            onChange={changeDocDataInfo}
            width={30}
          />
          г/н{" "}
          <InputDropDown
            name="gn"
            value={docData.gn}
            onChange={changeDocDataInfo}
            width={18}
          />
          <br />
          Он(а) же владелец{" "}
          <input
            type="checkbox"
            name="checkOwner"
            value={docData.checkOwner}
            onChange={() =>
              setDocData({ ...docData, ["checkOwner"]: !docData.checkOwner })
            }
          />{" "}
          <br />
          Принадлежащим{" "}
          {!docData.checkOwner ? (
            <InputDropDown
              name="fioNar"
              value={docData.fioNar}
              onChange={changeDocDataInfo}
              width={38}
            />
          ) : (
            <InputDropDown
              name="fioOwner"
              value={docData.fioOwner}
              onChange={changeDocDataInfo}
              width={38}
            />
          )}
          <br />
          категории{" "}
          <InputDropDown
            name="driverCategory"
            value={docData.driverCategory}
            onChange={changeDocDataInfo}
            width={2}
          />
          <br />
          <br />
          Дата:
          <br />
          День{" "}
          <InputDropDown
            name="narDay"
            value={docData.narDay}
            onChange={changeDocDataInfo}
            width={2}
          />
          <br />
          Месяц{" "}
          <InputDropDown
            name="narMonth"
            value={docData.narMonth}
            onChange={changeDocDataInfo}
            width={8}
          />
          <br />
          Год{" "}
          <InputDropDown
            name="narYear"
            value={docData.narYear}
            onChange={changeDocDataInfo}
            width={4}
          />
          <br />
          Часы{" "}
          <InputDropDown
            name="narHour"
            value={docData.narHour}
            onChange={changeDocDataInfo}
            width={2}
          />
          <br />
          Минуты{" "}
          <InputDropDown
            name="narMinute"
            value={docData.narMinute}
            onChange={changeDocDataInfo}
            width={2}
          />
          <br />
          Адрес регистрации{" "}
          <InputDropDown
            name="addressZapolneniya"
            value={docData.addressZapolneniya}
            onChange={changeDocDataInfo}
            width={63}
          />
          <br />
          Статья <Article />
          часть <Part />
          Обстоятельства смягчающие{" "}
          <select name="smag" value={docData.smag} onChange={changeDocDataInfo}>
            <option>имеются</option>
            <option>не имеются</option>
          </select>
          <br />
          Обстоятельства отягчающие{" "}
          <select name="otag" value={docData.otag} onChange={changeDocDataInfo}>
            <option>имеются</option>
            <option>не имеются</option>
          </select>
          <br />
          Должностное лицо, вынесшее постановление по делу: <InputDropDown />
          <br />
          <button onClick={() => setIsDoc(true)}>Перевести в документ</button>
        </div>
      )}
    </>
  );
}

export default Doc;
