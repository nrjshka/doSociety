#doSociety#
#doSociety - новая социальная сеть, цель которой заключается в поиске потенциально интересных собеседников в максимально близком регионе.
#Основная концепция
Суть заключается в работе VK API, которая предоставляет работу с группами, музыкой и личной информацией каждого пользователя. 
Находя максимально близких людей по интересам(пересечениям общих групп и музыкальных исполнителей) и сортируя их по геопозиции(или исходя из личной информации), можно найти потенциально интересных собеседников, учитывая разницу в возрасте(+-5 лет).
#Возможности
1. Возможность приватного чата с потенциально интересными и близкими собеседниками
2. Возможность выбора региона для поиска собеседников(например: при переезде, появляется потребность в новых друзьях; при поступлении в вуз другого города, нужно найти новых друзей, максимально близких по твоим интересам)
3. Возможность общения на базе doSociety(при добавлении этой возможности, людям не потребуется "контачиться" в других социальных сетях)
4. Возможность прослушивания аудиозаписей(онлайн и оффлайн)
5. Возможность добавления фотографий и видео
(По мере развития, список будет продолжаться)
#Основные постулаты
1. Актуальность(включает в себя нужность, именно из-за этого большое внимание должно быть уделено интерфейсу поиска новых собеседников)
2. Скорость(при выше всего; вся работа должно происходить "плавно" и без типичных для android-приложений "подлагиваний")
3. Элементарность и простота в использовании(все дожно быть просто и ясно, чтобы человек любого возраста смог без затруднений разобраться в приложении и найти нужную ему функцию)
#TODO List
1. Разобраться с работой VK API
2. Создание шаблона будущего приложения
3. Проектрирование архитектуры
4. Написание сервера
5. Верстка клиента
6. Функционирование клиента
#VK API
VK API предоставляет всю необходимую информацию для работы с группами, но 16 декабря 2016 года VK отключила поддержку Audio API(из-за монетизация ИМХО). Придется парсить аудиозаписи посредством магии PHP(со стороны сервера), для этого придется предварительно просить людей включить общий доступ к аудиозаписям(естественно не все последуют совету, но это все, что мы можем сделать в данной ситуации). 

##Для работы с группами можно использовать следующие методы(список может пополняться):##
1. [Для узнавания определенных групп пользователя](https://vk.com/dev/groups.getCatalog)
2. [Для поиска каталог пользователя](https://vk.com/dev/groups.getMembers)
3. [Здесь можно организовать интересующий нас поиск записей](https://vk.com/dev/groups.search)


##Насчет аудиозаписей##
Пытаемся найти аудиозаписи на странице,если находим, то начинаем парсить, в противном случае вешаем подсказку о необходимости открытия аудиозаписей.

##Насчет получения личной информации##
В VK API для этих целей есть специальный [метод](https://vk.com/dev/account.getInfo), думаю, его хватит с головой.

... ниже будут отдельные пункты, которые мне показались "интересными" или то, с чем я столкнулся в процессе выполнения определенной задачи ...