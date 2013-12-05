define("sarike/moment-timezone/0.0.3/moment-timezone",["moment"],function(a){function b(a){a+="";var b=a.split(":"),c=~a.indexOf("-")?-1:1,d=Math.abs(+b[0]),e=parseInt(b[1],10)||0,f=parseInt(b[2],10)||0;return c*(60*d+e+f/60)}function c(a,c,d,e,f,g,h,i,j,k){this.name=a,this.startYear=+c,this.endYear=+d,this.month=+e,this.day=+f,this.dayRule=+g,this.time=b(h),this.timeRule=+i,this.offset=b(j),this.letters=k||""}function d(a,b){this.rule=b,this.start=b.start(a)}function e(a,b){return a.isLast?-1:b.isLast?1:b.start-a.start}function f(a){this.name=a,this.rules=[]}function g(a,c,d,e,f,g){var h,i="string"==typeof f?f.split("_"):[9999];for(this.name=a,this.offset=b(c),this.ruleSet=d,this.letters=e,h=0;h<i.length;h++)i[h]=+i[h];this.until=u.utc(i).subtract("m",b(g))}function h(a,b){return a.until-b.until}function i(a){this.name=l(a),this.displayName=a,this.zones=[]}function j(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)k(b+"	"+d[c])}function k(a){if(y[a])return y[a];var b=a.split(/\s/),d=l(b[0]),e=new c(d,b[1],b[2],b[3],b[4],b[5],b[6],b[7],b[8],b[9],b[10]);return y[a]=e,p(d).add(e),e}function l(a){return(a||"").toLowerCase().replace(/\//g,"_")}function m(a){var b,c,d;for(b in a)for(d=a[b],c=0;c<d.length;c++)o(b+"	"+d[c])}function n(a){var b;for(b in a)C[l(b)]=l(a[b])}function o(a){if(A[a])return A[a];var b=a.split(/\s/),c=l(b[0]),d=new g(c,b[1],p(b[2]),b[3],b[4],b[5]);return A[a]=d,q(b[0]).add(d),d}function p(a){return a=l(a),z[a]||(z[a]=new f(a)),z[a]}function q(a){var b=l(a);return C[b]&&(b=C[b]),B[b]||(B[b]=new i(a)),B[b]}function r(a){a&&(a.zones&&m(a.zones),a.rules&&j(a.rules),a.links&&n(a.links))}function s(){var a,b=[];for(a in B)b.push(B[a]);return b}var t,u=a("moment"),v="0.0.3",w=u.fn.zoneName,x=u.fn.zoneAbbr,y={},z={},A={},B={},C={},D=1,E=2,F=7,G=8;return c.prototype={contains:function(a){return a>=this.startYear&&a<=this.endYear},start:function(a){return a=Math.min(Math.max(a,this.startYear),this.endYear),u.utc([a,this.month,this.date(a),0,this.time])},date:function(a){return this.dayRule===F?this.day:this.dayRule===G?this.lastWeekday(a):this.weekdayAfter(a)},weekdayAfter:function(a){for(var b=this.day,c=u([a,this.month,1]).day(),d=this.dayRule+1-c;b>d;)d+=7;return d},lastWeekday:function(a){var b=this.day,c=b%7,d=u([a,this.month+1,1]).day(),e=u([a,this.month,1]).daysInMonth(),f=e+(c-(d-1))-7*~~(b/7);return c>=d&&(f-=7),f}},d.prototype={equals:function(a){return a&&a.rule===this.rule?Math.abs(a.start-this.start)<864e5:!1}},f.prototype={add:function(a){this.rules.push(a)},ruleYears:function(a,b){var c,f,g,h=a.year(),i=[];for(c=0;c<this.rules.length;c++)f=this.rules[c],f.contains(h)?i.push(new d(h,f)):f.contains(h+1)&&i.push(new d(h+1,f));return i.push(new d(h-1,this.lastYearRule(h-1))),b&&(g=new d(h-1,b.lastRule()),g.start=b.until.clone().utc(),g.isLast=b.ruleSet!==this,i.push(g)),i.sort(e),i},rule:function(a,b,c){var d,e,f,g,h,i=this.ruleYears(a,c),j=0;for(c&&(e=c.offset+c.lastRule().offset,f=9e4*Math.abs(e)),h=i.length-1;h>-1;h--)g=d,d=i[h],d.equals(g)||(c&&!d.isLast&&Math.abs(d.start-c.until)<=f&&(j+=e-b),d.rule.timeRule===E&&(j=b),d.rule.timeRule!==D&&d.start.add("m",-j),j=d.rule.offset+b);for(h=0;h<i.length;h++)if(d=i[h],a>=d.start&&!d.isLast)return d.rule;return t},lastYearRule:function(a){var b,c,d,e=t,f=-1e30;for(b=0;b<this.rules.length;b++)c=this.rules[b],a>=c.startYear&&(d=c.start(a),d>f&&(f=d,e=c));return e}},g.prototype={rule:function(a,b){return this.ruleSet.rule(a,this.offset,b)},lastRule:function(){return this._lastRule||(this._lastRule=this.rule(this.until)),this._lastRule},format:function(a){return this.letters.replace("%s",a.letters)}},i.prototype={zoneAndRule:function(a){var b,c,d;for(a=a.clone().utc(),b=0;b<this.zones.length&&(c=this.zones[b],!(a<c.until));b++)d=c;return[c,c.rule(a,d)]},add:function(a){this.zones.push(a),this.zones.sort(h)},format:function(a){var b=this.zoneAndRule(a);return b[0].format(b[1])},offset:function(a){var b=this.zoneAndRule(a);return-(b[0].offset+b[1].offset)}},u.updateOffset=function(a){var b;a._z&&(b=a._z.offset(a),Math.abs(b)<16&&(b/=60),a.zone(b))},u.fn.tz=function(a){return a?(this._z=q(a),this._z&&u.updateOffset(this),this):this._z?this._z.displayName:void 0},u.fn.zoneName=function(){return this._z?this._z.format(this):w.call(this)},u.fn.zoneAbbr=function(){return this._z?this._z.format(this):x.call(this)},u.tz=function(){var a,b=[],c=arguments.length-1;for(a=0;c>a;a++)b[a]=arguments[a];var d=u.apply(null,b),e=d.zone();return d.tz(arguments[c]),d.add("minutes",d.zone()-e)},u.tz.add=r,u.tz.addRule=k,u.tz.addZone=o,u.tz.zones=s,u.tz.version=v,t=k("- 0 9999 0 0 0 0 0 0"),u.tz.add({zones:{"Asia/Chongqing":["7:6:20 - LMT 1928 7:6:20","7 - LONT 1980_4 7","8 PRC C%sT"],"Asia/Hong_Kong":["7:36:42 - LMT 1904_9_30 7:36:42","8 HK HK%sT 1941_11_25 8","9 - JST 1945_8_15 9","8 HK HK%sT"],"Asia/Shanghai":["8:5:57 - LMT 1928 8:5:57","8 Shang C%sT 1949 8","8 PRC C%sT"],"Asia/Taipei":["8:6 - LMT 1896 8:6","8 Taiwan C%sT"]},rules:{PRC:["1986 1986 4 4 7 0 0 1 D","1986 1991 8 11 0 0 0 0 S","1987 1991 3 10 0 0 0 1 D"],HK:["1941 1941 3 1 7 3:30 0 1 S","1941 1941 8 30 7 3:30 0 0","1946 1946 3 20 7 3:30 0 1 S","1946 1946 11 1 7 3:30 0 0","1947 1947 3 13 7 3:30 0 1 S","1947 1947 11 30 7 3:30 0 0","1948 1948 4 2 7 3:30 0 1 S","1948 1951 9 0 8 3:30 0 0","1952 1952 9 25 7 3:30 0 0","1949 1953 3 1 0 3:30 0 1 S","1953 1953 10 1 7 3:30 0 0","1954 1964 2 18 0 3:30 0 1 S","1954 1954 9 31 7 3:30 0 0","1955 1964 10 1 0 3:30 0 0","1965 1976 3 16 0 3:30 0 1 S","1965 1976 9 16 0 3:30 0 0","1973 1973 11 30 7 3:30 0 1 S","1979 1979 4 8 0 3:30 0 1 S","1979 1979 9 16 0 3:30 0 0"],Shang:["1940 1940 5 3 7 0 0 1 D","1940 1941 9 1 7 0 0 0 S","1941 1941 2 16 7 0 0 1 D"],Taiwan:["1945 1951 4 1 7 0 0 1 D","1945 1951 9 1 7 0 0 0 S","1952 1952 2 1 7 0 0 1 D","1952 1954 10 1 7 0 0 0 S","1953 1959 3 1 7 0 0 1 D","1955 1961 9 1 7 0 0 0 S","1960 1961 5 1 7 0 0 1 D","1974 1975 3 1 7 0 0 1 D","1974 1975 9 1 7 0 0 0 S","1979 1979 5 30 7 0 0 1 D","1979 1979 8 30 7 0 0 0 S"]},links:{}}),u});