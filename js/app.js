var weatherApp = (function () {
    'use strict';

    var a = htmlTemplate('a'),
        br = htmlTemplate('br'),
        div = htmlTemplate('div'),
        h2 = htmlTemplate('h2'),
        hr = htmlTemplate('hr'),
        img = htmlTemplate('img'),
        li = htmlTemplate('li'),
        p = htmlTemplate('p'),
        strong = htmlTemplate('strong'),
        ul = htmlTemplate('ul');

    if (typeof recoverLocation() !== 'undefined') {
        getLocation(recoverLocation());
    }

    document.getElementById('go').onclick = function () {
        return getLocation(document.findLocation.city.value);
    };

    return {
        displayWeather: displayWeather,
        displayForecast: displayForecast
    };

    function displayForecast(forecast) {
        document.getElementById(forecast.city.id + 'forecast').innerHTML = formatForecast(forecast);
    }

    function displayWeather(content) {
        var formattedWeather = formatWeather(content),
            i = 0,
            links = formattedWeather.links;
        document.getElementById('output').innerHTML = formattedWeather.html;
        for (; i < links.length; i += 1) {
            document.getElementById(links[i]).onclick = handleForecastClick;
        }
    }

    function formatForecast(forecast) {
        var date, 
            html = '',
            i = 0,
            imgBaseUrl = 'http://openweathermap.org/img/w/',
            T3 = 273.15;
        for(; i < forecast.list.length; i += 1) {
            date = new Date(forecast.list[i].dt * 1000);
            html += 
            li(
                strong(date.toDateString()) +
                ' daytime temperature: ' + Math.floor(forecast.list[i].temp.day - T3) + '°С, ' + 
                forecast.list[i].weather[0].description + '. Clouds: ' + forecast.list[i].clouds + '%' +
                img('', [{name: 'src', value: imgBaseUrl + forecast.list[i].weather[0].icon + '.png'}])
            );
        }
        return ul(html, [{name: 'class', value: 'forecast'}]);
    }

    function formatWeather(content) {
        var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/',
            html = '',
            i = 0,
            imgBaseUrl = 'http://openweathermap.org/img/w/',
            links = [],
            location,
            T3 = 273.15;
        for (; i < content.list.length; i += 1) {
            location = content.list[i];
            html += 
            h2( 
                location.name + ' (' + location.sys.country + ')' + 
                img('', [{name: 'src', value: imgBaseUrl + location.weather[0].icon + '.png'}])
            ) +
            p( 
                strong( 'Description: ') + location.weather[0].description + br() +
                strong( 'Clouds: ') + location.clouds.all + '%'
            ) +
            ul(
                li( 
                    strong( 'Current temperature:' ) + Math.floor(location.main.temp - T3) + '°С' 
                ) +
                li( 
                    strong( 'High temperature: ') + Math.floor(location.main.temp_max - T3) + '°С' 
                ) +
                li (
                    strong( 'Low temperature: ') + Math.floor(location.main.temp_min - T3) + '°С' 
                )
            ) +
            p(
                a('Click here for the 5 day weather forecast', [
                    {name: 'href', value: apiBaseUrl + 'forecast/daily?q=' + location.name + ',' + location.sys.country + '&cnt=5&callback=weatherApp.displayForecast'}, 
                    {name: 'id', value: location.id}
                ])
            ) + 
            div('', [{name: 'id', value: location.id + 'forecast'}]) +
            hr();
            links.push(location.id);
        }
        return {
            html: html, 
            links: links
        };
    }

    function getJSON(url) {
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }

    function getLocation(location) {
        var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';
        getJSON(apiBaseUrl + 'find?callback=weatherApp.displayWeather&q='
                           + location
                           + '&APPID=6cba3a4c3d666fe9b486db2c5d8329db'
                           + '&sort=population&cnt=30');
        persistLocation(location);
        return false;
    }

    function handleForecastClick() {
        getJSON(this.getAttribute('href'));
        return false;
    }

    function htmlTemplate(tagName) {
        return function (content, attr) {
            var attributes = '',
                i = 0;
            if (typeof attr !== 'undefined') {
                for(; i < attr.length; i += 1) {
                    attributes += ' ' + attr[i].name + '="' + attr[i].value + '"';
                }
            }
            if (typeof content === 'undefined') {
                return '<' + tagName + attributes + '>';
            }
            return '<' + tagName + attributes + '>' + content + '</' + tagName + '>';
        };
    }

    function persistLocation(location) {
        var date = new Date(),
            thirtyDays = 2592000000;
        date.setTime(date.getTime() + thirtyDays); 
        document.cookie = 'previousCity' + '=' + location + '; expires=' + date.toUTCString() + '; path=/';
    }

    function recoverLocation() {
        var crumb,
            crumbs = document.cookie.split(';'),
            i = 0;
        for(; i < crumbs.length; i += 1) {
            crumb = crumbs[i].trim();
            if (crumb.indexOf('previousCity') === 0) {
                return crumb.substring('previousCity'.length + 1, crumb.length);
            }
        }
        return undefined;
    }
}());
