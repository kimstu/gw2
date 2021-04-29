$.fn.gw2info = function() {

var $this = $('.gw2-info');
$this.empty();
var length = $('.gw2-info').length;
var gw2_ids = new Array();
var ids = '';

var ids_array = new Array();
gw2_ids['items'] = '';
gw2_ids['itemstats'] = '';
gw2_ids['skills'] = '';
gw2_ids['specializations'] = '';
gw2_ids['traits'] = '';
gw2_ids['races'] = '';
gw2_ids['pets'] = '';
gw2_ids['pvpamulets'] = '';
gw2_ids['pvpsigils'] = '';
gw2_ids['pvprunes'] = '';
gw2_ids['currencies'] = '';
gw2_ids['icons'] = '';
gw2_ids['skins'] = '';
gw2_ids['colors'] = '';
gw2_ids['titles'] = '';
gw2_ids['achievements'] = '';
gw2_ids['minis'] = '';

gw2_ids['armors'] = '';
gw2_ids['weapons'] = '';
gw2_ids['sigils'] = '';
gw2_ids['runes'] = '';
gw2_ids['gems'] = '';
gw2_ids['trinkets'] = '';
gw2_ids['food'] = '';
gw2_ids['ascended_food'] = '';
gw2_ids['utility'] = '';
gw2_ids['infusions'] = '';
gw2_ids['glyphs'] = '';
gw2_ids['gatherings'] = '';

gw2_ids['pvp_weapons'] = '';
gw2_ids['pvp_sigils'] = '';
gw2_ids['pvp_runes'] = '';
gw2_ids['pvp_amulets'] = '';

gw2_ids['professions_icon'] = '';
gw2_ids['skills_icon'] = '';
gw2_ids['currencies'] = '';

gw2_ids['raid_boss'] = '';
gw2_ids['mistlock_instability'] = '';

for( i = 0 ; i <= length - 1 ; i++ ){

ids = '';
ids = $this.eq(i).attr('gw2-ids');
type = $this.eq(i).attr('gw2-type');

if( ids != '' && ids != undefined && type != '' && type != undefined ){

gw2_ids[type] += ids + ','; 

//特性
traits = '';
traits = $this.eq(i).attr('gw2-traits');
if( traits != undefined && traits != '' )
gw2_ids['traits'] += traits + ',';

//属性
itemstats = ''
itemstats = $this.eq(i).attr('gw2-itemstats');
if( itemstats != undefined && itemstats != '' )
gw2_ids['itemstats'] += itemstats + ',';


//拆解ids，添加class
ids_array = ids.split(',');
if( ids_array.length > 1 ){
for( j = 0 ; j <= ids_array.length - 1 ; j++ ){
$this.eq(i).addClass('gw2-'+type+'-'+ids_array[j]);
}
}
else{
$this.eq(i).addClass('gw2-'+type+'-'+ids);
}
}
}







//初始化请求 =============================================================
var gw2_data = new Array();
$.ajax({ 
type: 'POST',
url: "/tool/info", 
data: 'items=' + gw2_ids['items'] +
'&itemstats=' + gw2_ids['itemstats'] +
'&skills=' + gw2_ids['skills'] +
'&specializations=' + gw2_ids['specializations'] +
'&traits=' + gw2_ids['traits'] +

'&weapons=' + gw2_ids['weapons'] + 
'&armors=' + gw2_ids['armors'] +
'&trinkets=' + gw2_ids['trinkets'] +

'&sigils=' + gw2_ids['sigils'] +
'&runes=' + gw2_ids['runes'] +
'&gems=' + gw2_ids['gems'] +

'&food=' + gw2_ids['food'] +
'&ascended_food=' + gw2_ids['ascended_food'] +
'&utility=' + gw2_ids['utility'] +
'&infusions=' + gw2_ids['infusions'] +
'&glyphs=' + gw2_ids['glyphs'] +
'&gatherings=' + gw2_ids['gatherings'] +

'&pets=' + gw2_ids['pets'] +

'&pvp_weapons=' + gw2_ids['pvp_weapons'] + 
'&pvp_sigils=' + gw2_ids['pvp_sigils'] +
'&pvp_runes=' + gw2_ids['pvp_runes'] +
'&pvp_amulets=' + gw2_ids['pvp_amulets'] +

'&professions_icon=' + gw2_ids['professions_icon'] + 
'&skills_icon=' + gw2_ids['skills_icon'] +
'&currencies=' + gw2_ids['currencies'] +

'&raid_boss=' + gw2_ids['raid_boss'] +
'&mistlock_instability=' + gw2_ids['mistlock_instability'] +

'&skins=' + gw2_ids['skins'] + 
'&colors=' + gw2_ids['colors'] +
'&minis=' + gw2_ids['minis'] +
'&achievements=' + gw2_ids['achievements'] +

'',
success: function(data){
//防止重复
$('.gw2-info').empty();

//信息存储
if( data.type == 'success' ){

//技能
for(var i in data.data.skills){
gw2_data['skills_' + i] = data.data.skills[i];
skill = $.parseJSON( data.data.skills[i] );
$('.gw2-skills-' + i).append(`
<div class="gw2-info-icon gw2-info-skills" 
style="background-image: url(` + skill.icon + `)"
id="skills_` + i + `"
gw2-type="skills"
>
</div>`);
if( skill.professions && skill.professions.length == 1 )
$('.gw2-skills-' + i).next('span').addClass('color-' + skill.professions[0]);
else
$('.gw2-skills-' + i).next('span').addClass('color-default');
}

//特性分支 ===================================================
for(var i in data.data.specializations){
gw2_data['specializations_' + i] = data.data.specializations[i];
specialization = $.parseJSON( data.data.specializations[i] );
$('.gw2-specializations-' + i).append(`
<div class="gw2-info-bg gw2-info-specializations-bg" 
style="background-image: url(` + specialization.background + `)" 
id="specializations_` + i + `" ></div>
<div class="gw2-info-specializations-bg-layer"></div>
`);

$(".gw2-specializations-" + i).append(`
<div class="gw2-info-icon gw2-info-specializations"
style="background-image: url(` + specialization.background + `)"
id="specializations_` + i + `"
gw2-type="specializations"
gw2-ids="specializations-` + i + `">
<div class="gw2-info-specializations-top"></div>
<div class="gw2-info-specializations-bottom"></div>
</div>`);
}
//特性分支 特性
for(var i in data.data.specializations_traits){
gw2_data['specializations_traits_' + i] = data.data.specializations_traits[i];
specializations_trait = $.parseJSON( data.data.specializations_traits[i] );
$('.gw2-specializations-' + specializations_trait.specialization).append(`
<div class="gw2-info-icon traits-` + i + `
gw2-info-trait-` + specializations_trait.slot + `
gw2-info-trait-` + specializations_trait.slot + `-tier-` + specializations_trait.tier + `
gw2-info-trait-` + specializations_trait.slot + `-order-` + specializations_trait.order + `"
style="background-image: url(` + specializations_trait.icon + `)"
gw2-type="specializations_traits"
id="specializations_traits_` + i + `"
></div>
`);
}

//特性
for(var i in data.data.traits){
gw2_data['traits_' + i] = data.data.traits[i];
trait = $.parseJSON( data.data.traits[i] );
$('.gw2-traits-' + trait.id).append(`
<div class="gw2-info-icon traits-` + i + `"
style="background-image: url(` + trait.icon + `)"
gw2-type="traits"
id="traits_` + i + `"
></div>
`);
}
//特性分支选中特性点亮
var traits = '';
var traits_array = new Array();
for( i = 0 ; i <= $(".gw2-info[gw2-type='specializations']").length - 1 ; i++ ){
traits = $(".gw2-info[gw2-type='specializations']").eq(i).attr('gw2-specializations-traits');
if( traits != '' && traits != undefined ){
traits_array = traits.split(',');

if( traits_array.length > 1 ){
for( j = 0 ; j <= traits_array.length - 1 ; j++ ){
if( $(".gw2-info[gw2-type='specializations']:eq("+i+") .traits-"+traits_array[j]).length > 0 )
$(".gw2-info[gw2-type='specializations']:eq("+i+") .traits-"+traits_array[j]).css('opacity','1');
}
}
else if( traits_array.length = 1 ){
if( $(".gw2-info[gw2-type='specializations']:eq("+i+") .traits-"+traits_array).length > 0 )
$(".gw2-info[gw2-type='specializations']:eq("+i+") .traits-"+traits_array).css('opacity','1');
}
}
}

//物品
for(var i in data.data.items){
gw2_data['items_' + i] = data.data.items[i];
item = $.parseJSON( data.data.items[i] );
if( item ){
$('.gw2-items-' + i).append(`
<div class="gw2-info-icon gw2-info-items items-border-` + item.rarity + `" 
style="background-image: url(` + item.icon + `)"
id="items_` + i + `"
gw2-type="items"
gw2-item-rarity="` + item.rarity + `"
gw2-item-type="` + item.type + `"
>
<a href="/database/item/` + item.id + `" target="_blank">&nbsp;</a>
</div>`);
}
}

//属性
for(var i in data.data.itemstats){
gw2_data['itemstats_' + i] = data.data.itemstats[i];
}

//武器 ======================================================
for(var i in data.data.weapons){
gw2_data['weapons_' + i] = data.data.weapons[i];
weapon = $.parseJSON( data.data.weapons[i] );
$('.gw2-weapons-' + i).append(`
<div class="gw2-info-icon gw2-info-weapons items-border-` + weapon.rarity + `" 
style="background-image: url(` + weapon.icon + `)"
id="weapons_` + i + `"
gw2-type="weapons"
gw2-item-rarity="` + weapon.rarity + `"
gw2-item-type="` + weapon.type + `"
gw2-item-detailstype="` + weapon.details.type + `">
<a href="/database/item/` + weapon.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//护甲
for(var i in data.data.armors){
gw2_data['armors_' + i] = data.data.armors[i];
armor = $.parseJSON( data.data.armors[i] );
$('.gw2-armors-' + i).append(`
<div class="gw2-info-icon gw2-info-armors items-border-` + armor.rarity + `" 
style="background-image: url(` + armor.icon + `)"
id="armors_` + i + `"
gw2-type="armors"
gw2-item-rarity="` + armor.rarity + `"
gw2-item-type="` + armor.type + `"
gw2-item-detailstype="` + armor.details.type + `">
<a href="/database/item/` + armor.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//首饰
for(var i in data.data.trinkets){
gw2_data['trinkets_' + i] = data.data.trinkets[i];
trinket = $.parseJSON( data.data.trinkets[i] );

if( trinket.details.hasOwnProperty('type') ){
$('.gw2-trinkets-' + i).append(`
<div class="gw2-info-icon gw2-info-trinkets items-border-` + trinket.rarity + `" 
style="background-image: url(` + trinket.icon + `)"
id="trinkets_` + i + `"
gw2-type="trinkets"
gw2-item-rarity="` + trinket.rarity + `"
gw2-item-type="` + trinket.type + `"
gw2-item-detailstype="` + trinket.details.type + `">
<a href="/database/item/` + trinket.id + `" target="_blank">&nbsp;</a>
</div>`);
}
else{
$('.gw2-trinkets-' + i).append(`
<div class="gw2-info-icon gw2-info-trinkets items-border-` + trinket.rarity + `" 
style="background-image: url(` + trinket.icon + `)"
id="trinkets_` + i + `"
gw2-type="trinkets"
gw2-item-rarity="` + trinket.rarity + `"
gw2-item-type="` + trinket.type + `">
<a href="/database/item/` + trinket.id + `" target="_blank">&nbsp;</a>
</div>`);
}

}
//法印
for(var i in data.data.sigils){
gw2_data['sigils_' + i] = data.data.sigils[i];
sigil = $.parseJSON( data.data.sigils[i] );
$('.gw2-sigils-' + i).append(`
<div class="gw2-info-icon gw2-info-sigils items-border-` + sigil.rarity + `" 
style="background-image: url(` + sigil.icon + `)"
id="sigils_` + i + `"
gw2-type="sigils"
>
<a href="/database/item/` + sigil.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//符文
for(var i in data.data.runes){
gw2_data['runes_' + i] = data.data.runes[i];
rune = $.parseJSON( data.data.runes[i] );
$('.gw2-runes-' + i).append(`
<div class="gw2-info-icon gw2-info-runes items-border-` + rune.rarity + `" 
style="background-image: url(` + rune.icon + `)"
id="runes_` + i + `"
gw2-type="runes"
>
<a href="/database/item/` + rune.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//宝石
for(var i in data.data.gems){
gw2_data['gems_' + i] = data.data.gems[i];
gem = $.parseJSON( data.data.gems[i] );
$('.gw2-gems-' + i).append(`
<div class="gw2-info-icon gw2-info-gems items-border-` + gem.rarity + `" 
style="background-image: url(` + gem.icon + `)"
id="gems_` + i + `"
gw2-type="gems"
>
<a href="/database/item/` + gem.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//食物
for(var i in data.data.food){
gw2_data['food_' + i] = data.data.food[i];
food = $.parseJSON( data.data.food[i] );
$('.gw2-food-' + i).append(`
<div class="gw2-info-icon gw2-info-food items-border-` + food.rarity + `" 
style="background-image: url(` + food.icon + `)"
id="food_` + i + `"
gw2-type="food"
>
<a href="/database/item/` + food.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//升华食物
for(var i in data.data.ascended_food){
gw2_data['ascended_food_' + i] = data.data.ascended_food[i];
ascended_food = $.parseJSON( data.data.ascended_food[i] );
$('.gw2-ascended_food-' + i).append(`
<div class="gw2-info-icon gw2-info-ascended_food items-border-` + ascended_food.rarity + `" 
style="background-image: url(` + ascended_food.icon + `)"
id="ascended_food_` + i + `"
gw2-type="ascended_food"
>
<a href="/database/item/` + ascended_food.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//通用效果
for(var i in data.data.utility){
gw2_data['utility_' + i] = data.data.utility[i];
utility = $.parseJSON( data.data.utility[i] );
$('.gw2-utility-' + i).append(`
<div class="gw2-info-icon gw2-info-utility items-border-` + utility.rarity + `" 
style="background-image: url(` + utility.icon + `)"
id="utility_` + i + `"
gw2-type="utility"
>
<a href="/database/item/` + utility.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//灌注
for(var i in data.data.infusions){
gw2_data['infusions_' + i] = data.data.infusions[i];
infusions = $.parseJSON( data.data.infusions[i] );
$('.gw2-infusions-' + i).append(`
<div class="gw2-info-icon gw2-info-infusions items-border-` + infusions.rarity + `" 
style="background-image: url(` + infusions.icon + `)"
id="infusions_` + i + `"
gw2-type="infusions"
>
<a href="/database/item/` + infusions.id + `" target="_blank">&nbsp;</a>
</div>`);
}
//宠物
for(var i in data.data.pets){
gw2_data['pets_' + i] = data.data.pets[i];
pets = $.parseJSON( data.data.pets[i] );
$('.gw2-pets-' + i).append(`
<div class="gw2-info-icon gw2-info-pets" 
style="background-image: url(` + pets.icon + `)"
id="pets_` + i + `"
gw2-type="pets"
></div>`);
}

//采集工具
for(var i in data.data.gatherings){
	gw2_data['gatherings_' + i] = data.data.gatherings[i];
	gathering = $.parseJSON( data.data.gatherings[i] );
	if( gathering ){
	$('.gw2-gatherings-' + i).append(`
	<div class="gw2-info-icon gw2-info-gatherings items-border-` + gathering.rarity + `" 
	style="background-image: url(` + gathering.icon + `)"
	id="gatherings_` + i + `"
	gw2-type="gatherings"
	gw2-gathering-rarity="` + gathering.rarity + `"
	gw2-gathering-type="` + gathering.type + `"
	>
	<a href="/database/item/` + gathering.id + `" target="_blank">&nbsp;</a>
	</div>`);
	}
}

//PVP武器
for(var i in data.data.pvp_weapons){
gw2_data['pvp_weapons_' + i] = data.data.pvp_weapons[i];
pvp_weapons = $.parseJSON( data.data.pvp_weapons[i] );
$('.gw2-pvp_weapons-' + i).append(`
<div class="gw2-info-icon gw2-info-pvp_weaponss" 
style="background-image: url(` + pvp_weapons.icon + `)"
id="pvp_weapons_` + i + `"
gw2-type="pvp_weapons"
></div>`);
}
//PVP项链
for(var i in data.data.pvp_amulets){
gw2_data['pvp_amulets_' + i] = data.data.pvp_amulets[i];
pvp_amulets = $.parseJSON( data.data.pvp_amulets[i] );
$('.gw2-pvp_amulets-' + i).append(`
<div class="gw2-info-icon gw2-info-pvp_amuletss" 
style="background-image: url(` + pvp_amulets.icon + `)"
id="pvp_amulets_` + i + `"
gw2-type="pvp_amulets"
></div>`);
}
//PVP法印
for(var i in data.data.pvp_sigils){
gw2_data['pvp_sigils_' + i] = data.data.pvp_sigils[i];
pvp_sigils = $.parseJSON( data.data.pvp_sigils[i] );
$('.gw2-pvp_sigils-' + i).append(`
<div class="gw2-info-icon gw2-info-pvp_sigilss" 
style="background-image: url(` + pvp_sigils.icon + `)"
id="pvp_sigils_` + i + `"
gw2-type="pvp_sigils"
></div>`);
}
//PVP符文
for(var i in data.data.pvp_runes){
gw2_data['pvp_runes_' + i] = data.data.pvp_runes[i];
pvp_runes = $.parseJSON( data.data.pvp_runes[i] );
$('.gw2-pvp_runes-' + i).append(`
<div class="gw2-info-icon gw2-info-pvp_runess" 
style="background-image: url(` + pvp_runes.icon + `)"
id="pvp_runes_` + i + `"
gw2-type="pvp_runes"
></div>`);
}

//职业图标
for(var i in data.data.professions_icon){
gw2_data['professions_icon_' + i] = data.data.professions_icon[i];
professions_icon = $.parseJSON( data.data.professions_icon[i] );
$('.gw2-professions_icon-' + i).append(`
<div class="gw2-info-icon gw2-info-professions_icons" 
style="background-image: url(` + professions_icon.icon + `)"
id="professions_icon_` + i + `"
gw2-type="professions_icon"
></div>`);
}

//技能图标
for(var i in data.data.skills_icon){
gw2_data['skills_icon_' + i] = data.data.skills_icon[i];
skills_icon = $.parseJSON( data.data.skills_icon[i] );
$('.gw2-skills_icon-' + i).append(`
<div class="gw2-info-icon gw2-info-skills_icons" 
style="background-image: url(` + skills_icon.icon + `)"
id="skills_icon_` + i + `"
gw2-type="skills_icon"
></div>`);
}

//货币
for(var i in data.data.currencies){
gw2_data['currencies_' + i] = data.data.currencies[i];
currencies = $.parseJSON( data.data.currencies[i] );
$('.gw2-currencies-' + i).append(`
<div class="gw2-info-icon gw2-info-currenciess" 
style="background-image: url(` + currencies.icon + `)"
id="currencies_` + i + `"
gw2-type="currencies"
></div>`);
}

//raid boss
for(var i in data.data.raid_boss){
gw2_data['raid_boss_' + i] = data.data.raid_boss[i];
raid_boss = $.parseJSON( data.data.raid_boss[i] );
$('.gw2-raid_boss-' + i).append(`
<div class="gw2-info-icon gw2-info-raid_bosss" 
style="background-image: url(` + raid_boss.icon + `)"
id="raid_boss_` + i + `"
gw2-type="raid_boss"
></div>`);
}

//雾锁异变
for(var i in data.data.mistlock_instability){
gw2_data['mistlock_instability_' + i] = data.data.mistlock_instability[i];
mistlock_instability = $.parseJSON( data.data.mistlock_instability[i] );
$('.gw2-mistlock_instability-' + i).append(`
<div class="gw2-info-icon gw2-info-mistlock_instability" 
style="background-image: url(` + mistlock_instability.icon + `)"
id="mistlock_instability_` + i + `"
gw2-type="mistlock_instability"
></div>`);
}

//皮肤
for(var i in data.data.skins){
gw2_data['skins_' + i] = data.data.skins[i];
skins = $.parseJSON( data.data.skins[i] );
$('.gw2-skins-' + i).append(`
<div class="gw2-info-icon gw2-info-skinss items-border-` + skins.rarity + `" 
style="background-image: url(` + skins.icon + `)"
id="skins_` + i + `"
gw2-type="skins"
></div>`);
}

//成就
for(var i in data.data.achievements){
gw2_data['achievements_' + i] = data.data.achievements[i];
achievements = $.parseJSON( data.data.achievements[i] );
$('.gw2-achievements-' + i).append(`
<div class="gw2-info-icon gw2-info-achievementss gw2-achievements-icon" 
id="achievements_` + i + `"
gw2-type="achievements"
></div>`);
}


//颜色
for(var i in data.data.colors){
gw2_data['colors_' + i] = data.data.colors[i];
colors = $.parseJSON( data.data.colors[i] );
$('.gw2-colors-' + i).append(`
<div class="gw2-info-icon gw2-info-colorss" 
style="background-image: url(` + colors.icon + `)"
id="colors_` + i + `"
gw2-type="colors"
></div>`);
}

//迷你宠物
for(var i in data.data.minis){
gw2_data['minis_' + i] = data.data.minis[i];
minis = $.parseJSON( data.data.minis[i] );
$('.gw2-minis-' + i).append(`
<div class="gw2-info-icon gw2-info-miniss" 
style="background-image: url(` + minis.icon + `)"
id="minis_` + i + `"
gw2-type="minis"
></div>`);
}
}
else{

}}

}).then(function(){

//返回信息显示 ===========================================================
$('.gw2-info-icon').hover(function(){

//$('#tooltip-info').empty();
var gw2_type = $(this).attr('gw2-type');
var key = $(this).attr('id');
var value = $.parseJSON( gw2_data[key] );

//items
if( gw2_type == 'items' ||
gw2_type == 'weapons' ||
gw2_type == 'armors' ||
gw2_type == 'trinkets' ||
gw2_type == 'sigils' ||
gw2_type == 'runes' ||
gw2_type == 'gems' ||
gw2_type == 'food' ||
gw2_type == 'ascended_food' ||
gw2_type == 'utility' ||
gw2_type == 'infusions' ||
gw2_type == 'gatherings' 
){
if( $(this).parent().attr('gw2-itemstats') && $(this).attr('gw2-item-rarity') && $(this).attr('gw2-item-type') && $(this).attr('gw2-item-detailstype') ){
itemstat_data = $.parseJSON( gw2_data['itemstats_' + $(this).parent().attr('gw2-itemstats')] );

if( $(this).attr('gw2-item-type') == "Back" )
itemstat = eval('itemstat_data.' + $(this).attr('gw2-item-rarity').toLowerCase() + '.' + $(this).attr('gw2-item-type'));
else
itemstat = eval('itemstat_data.' + $(this).attr('gw2-item-rarity').toLowerCase() + '.' + $(this).attr('gw2-item-detailstype'));

if( !itemstat )
itemstat = null;

}
else
itemstat = null;

var app = new Vue({
el: '#app-info',
data:{
item: value,
itemstat: itemstat
},
created: function(){

//描述
if( this.item.description ){
this.item.description = this.item.description.replace(/\n/g,"<br/>");
} 

if( this.item.details ){
if( this.item.details.description ){
this.item.details.description = this.item.details.description.replace(/\n/g,"<br/>");
}

if( this.item.details.infix_upgrade ){
if( this.item.details.infix_upgrade.buff ){
if( this.item.details.infix_upgrade.buff.description ){
this.item.details.infix_upgrade.buff.description = this.item.details.infix_upgrade.buff.description.replace(/\n/g,"<br/>");
if( this.item.type == 'UpgradeComponent' && this.item.details.type == 'Default' && this.item.details.infix_upgrade.attributes )
this.item.details.infix_upgrade.attributes = '';
}
}
}


//持续时间
if( this.item.details.duration_ms ){
if( this.item.details.duration_ms < 60000 ){
this.item.details.duration_sec = parseInt(this.item.details.duration_ms / 1000);
this.item.details.duration_min = 0;
this.item.details.duration_hour = 0;
}
else if( this.item.details.duration_ms >= 60000 && this.item.details.duration_ms < 3600000 ){
this.item.details.duration_sec = parseInt(this.item.details.duration_ms % 1000);
this.item.details.duration_min = parseInt(this.item.details.duration_ms / 60000);
this.item.details.duration_hour = 0;
}
else if( this.item.details.duration_ms >= 3600000 ){
this.item.details.duration_sec = parseInt(( this.item.details.duration_ms % 60000 ) / 1000);
this.item.details.duration_min = parseInt(( this.item.details.duration_ms % 3600000 ) / 60000);
this.item.details.duration_hour = parseInt(this.item.details.duration_ms / 3600000);
}
}
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-items-title">
<div class="gw2-info-box-items-icon" :style="'background-image: url(' + item.icon + ')'" ></div>
<span :class="'gw2-info-box-items-name gw2-info-' + item.rarity">
<span v-html="item.name"></span>
</span>
</div>

<div class="gw2-info-box-items-rows">
<template v-if="item.type != 'Armor' && item.type != 'Weapon' && item.type != 'Trinket'">
<!--描述--> 
<template v-if="item.description || !item.details || (item.details && !item.details.type) || (item.details && item.details.type && item.details.type != 'Food')">
<div class="gw2-info-box-items-row">
<span v-html="item.description"></span>
</div>
</template>

<template v-if="item.details && item.details.description">
<div class="gw2-info-box-items-row">
<template v-if="item.details.icon">
<div class="gw2-info-box-items-row-icon" :style="'background-image:url(' + item.details.icon + ')'"></div>
</template>
<span class="gw2-info-box-items-row-description color-Junk">
<template v-if="item.details.name">{{ item.details.name }}</template>
<template v-if="item.details.duration_ms">
(<template v-if="item.details.duration_hour ">{{ item.details.duration_hour }} 小时</template>
<template v-if="item.details.duration_min ">{{ item.details.duration_min }} 分钟</template>
<template v-if="item.details.duration_sec ">{{ item.details.duration_sec }} 秒</template>):
</template>
<span v-html="item.details.description"></span>
</span>
</div>
</template>
</template>

<!--武器威力-->			
<template v-if="item.details && item.details.min_power && item.details.max_power">
<div class="gw2-info-box-items-row">
武器威力 : 
<span class="color-Masterwork">{{ item.details.min_power }} - {{ item.details.max_power }}</span>
</div>
</template>

<!--防御-->			
<template v-if="item.details && item.details.defense">
防御 : <span class="color-Masterwork">{{ item.details.defense }}</span>
</template>

<!--属性-->
<template v-if="item.details && item.details.infix_upgrade">
<!--属性描述-->
<template v-if="item.details.infix_upgrade.buff">
<template v-if="item.details.infix_upgrade.buff.description">
<template v-if="item.type != 'Trinket' && item.type != 'Back' && item.details.type != 'UpgradeComponent'">
<div class="gw2-info-box-items-row">
<span class="color-Fine">
<span v-html="item.details.infix_upgrade.buff.description"></span>
</span>
</div>
</template>
</template>
</template>

<!--属性值-->
<template v-if="item.details.infix_upgrade.attributes">
<template v-for="attributes in item.details.infix_upgrade.attributes">
<div class="gw2-info-box-items-row">
<span class="color-Masterwork">
+{{ attributes.modifier }}
<template v-if="attributes.attribute == 'Power'">威力</template>
<template v-else-if="attributes.attribute == 'Toughness'">坚韧</template>
<template v-else-if="attributes.attribute == 'Vitality'">体力</template>
<template v-else-if="attributes.attribute == 'Precision'">精准</template>
<template v-else-if="attributes.attribute == 'CritDamage'">暴击效果</template>
<template v-else-if="attributes.attribute == 'ConditionDamage'">症状伤害</template>
<template v-else-if="attributes.attribute == 'Healing'">治疗效果</template>
<template v-else-if="attributes.attribute == 'ConditionDuration'">症状效果</template>
<template v-else-if="attributes.attribute == 'BoonDuration'">增益效果</template>
<template v-else-if="attributes.attribute == 'AgonyResistance'">痛苦抗性</template>
<template v-else>属性{{ attributes.attribute }}</template>
</span>
</div>
</template>
</template>
</template>
<template v-else-if="itemstat">
<template v-for="attributes in itemstat">
<div class="gw2-info-box-items-row">
<span class="color-Masterwork">
+{{ attributes.modifier }}
<template v-if="attributes.attribute == 'Power'">威力</template>
<template v-else-if="attributes.attribute == 'Toughness'">坚韧</template>
<template v-else-if="attributes.attribute == 'Vitality'">体力</template>
<template v-else-if="attributes.attribute == 'Precision'">精准</template>
<template v-else-if="attributes.attribute == 'CritDamage'">暴击效果</template>
<template v-else-if="attributes.attribute == 'ConditionDamage'">症状伤害</template>
<template v-else-if="attributes.attribute == 'Healing'">治疗效果</template>
<template v-else-if="attributes.attribute == 'ConditionDuration'">症状效果</template>
<template v-else-if="attributes.attribute == 'BoonDuration'">增益效果</template>
<template v-else-if="attributes.attribute == 'AgonyResistance'">痛苦抗性</template>
<template v-else>属性{{ attributes.attribute }}</template>
</span>
</div>
</template>
</template>

<!--属性描述-->
<template v-if="item.details && item.details.bonuses">
<template v-for="(bonuse,index) in item.details.bonuses">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
({{ index + 1 }})<span v-html="bonuse"></span>
</span>
</div>
</template>
</template>
</div>

<!--升级槽-->
<template v-if="item.details && item.details.suffix_item_id">
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<template v-if="item.details.suffix_item_icon">
<div class="gw2-info-box-items-suffix-icon" :style="'background-image: url(' + item.details.suffix_item_icon + ')'"></div>
</template>
<span class="color-Fine">{{ item.details.suffix_item_name }}</span>
</div>
<template v-if="item.details.suffix_item_type == 'Rune'">
<template v-for="(bonuse,index) in item.details.suffix_item_bonuses">
<div class="gw2-info-box-items-row">
<span class="color-Fine">({{ index + 1 }})<span v-html="bonuse"></span></span>
</div>
</template>
</template>
<template v-else-if="item.details.suffix_item_type == 'Sigil' || item.details.suffix_item_type == 'Default' || item.details.suffix_item_type == 'Gem'">
<div class="gw2-info-box-items-row">
<span class="color-Fine"><span v-html="item.details.suffix_item_description"></span></span>
</div>
</template>
</div>
</template>
<template v-if="item.details && item.details.secondary_suffix_item_id">
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<template v-if="item.details.suffix_item_icon">
<div class="gw2-info-box-items-suffix-icon" :style="'background-image: url(' + item.details.secondary_suffix_item_icon + ')'"></div>
</template>
<span class="color-Fine">{{ item.details.secondary_suffix_item_name }}</span>
</div>
<template v-if="item.details.secondary_suffix_item_type == 'Rune'">
<template v-for="(bonuse,index) in item.details.secondary_suffix_item_bonuses">
<div class="gw2-info-box-items-row">
<span class="color-Fine">({{ index + 1 }})<span v-html="bonuse"></span></span>
</div>
</template>
</template>
<template v-else-if="item.details.secondary_suffix_item_type == 'Sigil' || item.details.secondary_suffix_item_type == 'Default' || item.details.secondary_suffix_item_type == 'Gem'">
<div class="gw2-info-box-items-row">
<span class="color-Fine"><span v-html="item.details.secondary_suffix_item_description"></span></span>
</div>
</template>
</div>
</template>

<!--灌注槽-->
<template v-if="item.details && item.details.infusion_slots">
<template v-for="infusion_slot in item.details.infusion_slots">

<template v-for="flag in infusion_slot.flags">
<template v-if="flag == 'Infusion'">
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row gw2-info-box-items-infusion">未使用的灌注槽</div>
</div>
</template>

<template v-else-if="flag == 'Enrichment'">
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row gw2-info-box-items-enrichment">未使用的富集槽</div>
</div>
</template>
</template>
</template>
</template>

<!--描述--> 
<template v-if="item.description && item.details && item.details.type">
<template v-if="item.details.type == 'Food'">
<div class="gw2-info-box-items-row p-b-15">
<span v-html="item.description"></span>
</div>
</template>
</template>

<!--皮肤-->
<template v-if="item.default_skin_name">
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row"><span class="color-Junk">{{ item.default_skin_name }} (皮肤)</span></div>
</div>
</template>

<div class="gw2-info-box-items-rows">
<!--物品品质-->
<template v-if="item.rarity">
<div class="gw2-info-box-items-row">
<template v-if="item.rarity == 'Legendary'">传奇</template>
<template v-else-if="item.rarity == 'Ascended'">升华</template>
<template v-else-if="item.rarity == 'Exotic'">特异</template>
<template v-else-if="item.rarity == 'Rare'">稀有</template>
<template v-else-if="item.rarity == 'Masterwork'">精制</template>
<template v-else-if="item.rarity == 'Fine'">优质</template>
<template v-else-if="item.rarity == 'Basic'">普通</template>
<template v-else-if="item.rarity == 'Junk'">垃圾</template>
<template v-else>{{ item.rarity }}</template>
</div>
</template>

<!--装备种类-->
<template v-if="item.details && item.details.weight_class">
<div class="gw2-info-box-items-row">
<template v-if="item.details.weight_class == 'Light'">轻甲</template>
<template v-else-if="item.details.weight_class == 'Medium'">中甲</template>
<template v-else-if="item.details.weight_class == 'Heavy'">重甲</template>
<template v-else-if="item.details.weight_class == 'Clothing'">城镇护甲</template>
<template v-else>装备种类{{ item.details.weight_class }}</template> 
</div>
</template>

<!--物品类型：装备部位-->
<template v-if="item.details && item.details.type">
<div class="gw2-info-box-items-row">
<!--护甲-->
<template v-if="item.details.type == 'Coat'">胸部护甲</template>
<template v-else-if="item.details.type == 'Leggings'">腿部护甲</template>
<template v-else-if="item.details.type == 'Gloves'">手部护甲</template>
<template v-else-if="item.details.type == 'Helm'">头部护甲</template>
<template v-else-if="item.details.type == 'Boots'">足部护甲</template>
<template v-else-if="item.details.type == 'Shoulders'">肩部护甲</template>
<template v-else-if="item.details.type == 'HelmAquatic'">头部呼吸器</template>
<!--武器-->
<template v-else-if="item.details.type == 'Greatsword'">巨剑 (双手)</template>
<template v-else-if="item.details.type == 'Staff'">法杖 (双手)</template>
<template v-else-if="item.details.type == 'LongBow'">长弓 (双手)</template>
<template v-else-if="item.details.type == 'ShortBow'">短弓 (双手)</template>
<template v-else-if="item.details.type == 'Hammer'">巨锤 (双手)</template>
<template v-else-if="item.details.type == 'Rifle'">步枪 (双手)</template>
<template v-else-if="item.details.type == 'Sword'">单手剑 (单手)</template>
<template v-else-if="item.details.type == 'Axe'">斧 (单手)</template>
<template v-else-if="item.details.type == 'Dagger'">匕首 (单手)</template>
<template v-else-if="item.details.type == 'Mace'">钉锤 (单手)</template>
<template v-else-if="item.details.type == 'Pistol'">手枪 (单手)</template>
<template v-else-if="item.details.type == 'Scepter'">节杖 (单手)</template>
<template v-else-if="item.details.type == 'Focus'">聚能器 (副手)</template>
<template v-else-if="item.details.type == 'Torch'">火炬 (副手)</template>
<template v-else-if="item.details.type == 'Warhorn'">战号 (副手)</template>
<template v-else-if="item.details.type == 'Shield'">盾牌 (副手)</template>
<template v-else-if="item.details.type == 'Harpoon'">长矛 (双手)</template>
<template v-else-if="item.details.type == 'Speargun'">鱼叉枪 (双手)</template>
<template v-else-if="item.details.type == 'Trident'">三叉戟 (双手)</template>
<!--首饰-->
<template v-else-if="item.details.type == 'Accessory'">饰品</template>
<template v-else-if="item.details.type == 'Ring'">戒指</template>
<template v-else-if="item.details.type == 'Amulet'">项链</template>
<!--升级物品-->
<template v-else-if="item.details.type == 'Default'"></template>
<template v-else-if="item.details.type == 'Sigil'">法印</template>
<template v-else-if="item.details.type == 'Rune'">符文</template>
<template v-else-if="item.details.type == 'Gem'">通用灌注</template>
<!--消耗品-->
<template v-else-if="item.details.type == 'AppearanceChange'">变更消耗</template>
<template v-else-if="item.details.type == 'Booze'">饮品</template>
<template v-else-if="item.details.type == 'ContractNpc'">便捷NPC</template>
<template v-else-if="item.details.type == 'Food'">食物</template>
<template v-else-if="item.details.type == 'Generic'">消耗品</template>
<template v-else-if="item.details.type == 'Halloween'">消耗品</template>
<template v-else-if="item.details.type == 'Immediate'">消耗品</template>
<template v-else-if="item.details.type == 'Transmutation'">皮肤</template>
<template v-else-if="item.details.type == 'Unlock'">解锁物品</template>
<template v-else-if="item.details.type == 'UpgradeRemoval'">消耗品</template>
<template v-else-if="item.details.type == 'Utility'">通用效果</template>
<template v-else-if="item.details.type == 'TeleportToFriend'">好友传送</template>
<!--其他-->
<template v-else><!-- 物品类型 : {{ item.details.type }} --></template>
</div>
</template>

<!--物品类别-->
<template v-if="item.type">
<div class="gw2-info-box-items-row">
<template v-if="item.type == 'Armor'"><!-- 护甲 --></template>
<template v-else-if="item.type == 'Weapon'"><!-- 武器 --></template>
<template v-else-if="item.type == 'Trinket'"><!-- 首饰 --></template>
<template v-else-if="item.type == 'Back'">背部物品</template>
<template v-else-if="item.type == 'Bag'">背包</template>
<template v-else-if="item.type == 'Consumable'">可消耗</template>
<template v-else-if="item.type == 'Container'">包裹</template>
<template v-else-if="item.type == 'CraftingMaterial'">制作材料</template>
<template v-else-if="item.type == 'Gathering'">采集工具</template>
<template v-else-if="item.type == 'Gizmo'">杂项</template>
<template v-else-if="item.type == 'MiniPet'">迷你宠物</template>
<template v-else-if="item.type == 'Tool'">采集工具</template>
<template v-else-if="item.type == 'Trait'">工具</template>
<template v-else-if="item.type == 'Trophy'">战利品</template>
<template v-else-if="item.type == 'UpgradeComponent'">升级组件</template>
<template v-else>物品类别 : {{ item.type }}</template>
</div>
</template>

<!--等级-->
<template v-if="item.level">
<div class="gw2-info-box-items-row">
需要等级 : {{ item.level }}
</div>
</template>

<!--描述-->	
<template v-if="item.type == 'Armor' || item.type == 'Weapon' || item.type == 'Trinket'">
<template v-if="item.description">
<div class="gw2-info-box-items-row">
<span class="color-description"><span v-html="item.description"></span></span>
</div>
</template>
</template>


<!--绑定-->	
<template v-if="item.flags">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<template v-for="flag in item.flags">
<template v-if="flag == 'SoulBindOnUse'">使用后灵魂绑定</template>
<template v-else></template>
</template>
</span>
</div>
</template>

<!--交易商出售价格-->
<template v-if="item.vendor_value">
<div class="gw2-info-box-items-row">
<template v-if="( item.vendor_value / 10000 ) % 10000 > 1">
<span class="gw2-info-box-items-price price-gold">{{ parseInt(( item.vendor_value / 10000 ) % 10000) }}</span>
</template>
<template v-if="( item.vendor_value / 100 ) % 100 > 1">
<span class="gw2-info-box-items-price price-silver">{{ parseInt(( item.vendor_value / 100 ) % 100) }}</span>
</template>
<template v-if="item.vendor_value % 100 > 1">
<span class="gw2-info-box-items-price price-copper">{{ parseInt(item.vendor_value % 100) }}</span>
</template>
</div>
</template>
</div>
</div>
</div>
</div>`
})
}
//skills
else if(
gw2_type == 'skills'
){
var app = new Vue({
el: '#app-info',
data:{
skill: value
},
created: function(){
//描述
if( this.skill.description ){
this.skill.description = this.skill.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-skills-content">
<p class="gw2-info-box-skills-name"><span v-html="skill.name"></span><!-- ( ID : {{ skill.id }} ) --></p>
<p class="gw2-info-box-skills-description"><span v-html="skill.description"></span></p>
<template v-if="skill.facts != ''">
<div class="gw2-info-box-skills-facts">
<template v-for="fact in skill.facts">
<div :class="'gw2-info-box-skills-fact skills-fact-' + fact.type">
<template v-if="fact.type == 'Range'">
<!--范围-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">范围 : {{ fact.value }}</div>
</template>
<template v-else-if="fact.type == 'Recharge'">
<!--技能冷却-->
<div class="skills-fact-recharge-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-recharge-word">
<span class="color-Junk">
<template v-if="fact.value == '0.25'">¼</template>
<template v-else-if="fact.value == '0.5'">½</template>
<template v-else-if="fact.value == '0.75'">¾</template>
<template v-else-if="fact.value == '1.25'">1¼</template>
<template v-else-if="fact.value == '1.5'">1½</template>
<template v-else-if="fact.value == '1.75'">1¾</template>
<template v-else-if="fact.value == '2.25'">1¼</template>
<template v-else-if="fact.value == '2.5'">1½</template>
<template v-else-if="fact.value == '2.75'">1¾</template>
<template v-else-if="fact.value == '3.25'">1¼</template>
<template v-else-if="fact.value == '3.5'">1½</template>
<template v-else-if="fact.value == '3.75'">1¾</template>
<template v-else-if="fact.value == '4.25'">1¼</template>
<template v-else-if="fact.value == '4.5'">1½</template>
<template v-else-if="fact.value == '4.75'">1¾</template>
<template v-else-if="fact.value == '5.25'">1¼</template>
<template v-else-if="fact.value == '5.5'">1½</template>
<template v-else-if="fact.value == '5.75'">1¾</template>
<template v-else-if="fact.value == '6.25'">1¼</template>
<template v-else-if="fact.value == '6.5'">1½</template>
<template v-else-if="fact.value == '6.75'">1¾</template>
<template v-else-if="fact.value == '7.25'">1¼</template>
<template v-else-if="fact.value == '7.5'">1½</template>
<template v-else-if="fact.value == '7.75'">1¾</template>
<template v-else-if="fact.value == '8.25'">1¼</template>
<template v-else-if="fact.value == '8.5'">1½</template>
<template v-else-if="fact.value == '8.75'">1¾</template>
<template v-else-if="fact.value == '9.25'">1¼</template>
<template v-else-if="fact.value == '9.5'">1½</template>
<template v-else-if="fact.value == '9.75'">1¾</template>
<template v-else>{{ fact.value }}</template>
</span>
</div>
</template>
<template v-else-if="fact.type == 'Damage'">
<!--直伤-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.hit_count > 1">
<span v-html="fact.text"></span> : ({{ fact.hit_count }}×)系数 {{ fact.dmg_multiplier }}
</template>
<template v-else>
<span v-html="fact.text"></span> : 系数 {{ fact.dmg_multiplier }}
</template>
</div>
</template>
<template v-else-if="fact.type == 'Buff'">
<!--BUFF-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.apply_count > 1">
<span class="skills-fact-apply-count">{{ fact.apply_count }}</span>
</template>
<div class="skills-fact-word">
<span v-html="fact.status"></span>
<template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
<template v-if="fact.apply_count && !fact.description">{{ fact.apply_count }}</template>
</div>
</template>
<template v-else-if="fact.type == 'PrefixedBuff'">
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.prefix != ''">
<div class="skills-fact-image" :style="'background-image: url(' + fact.prefix.icon + ')'" ></div>
</template>
<div class="skills-fact-word"><span v-html="fact.status"></span><template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
</div>
</template>

<template v-else-if="fact.type == 'Number'">
<!--目标数-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.value }}</div>
</template>
<template v-else-if="fact.type == 'Duration'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template>
<template v-else-if="fact.type == 'Time'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template>
<template v-else-if="fact.type == 'Percent'">
<!--百分比-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : <template v-if="fact.percent">{{ fact.percent }}%</template>
<template v-else-if="fact.value">{{ fact.value }}</template></div>
</template>
<template v-else-if="fact.type == 'Distance'">
<!--半径-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.distance }}</div>
</template>
<template v-else-if="fact.type == 'Radius'">
<!--半径-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.distance }}</div>
</template>
<template v-else-if="fact.type == 'AttributeAdjust'">
<!--技能调整-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.text">
<span v-html="fact.text"></span> : {{ fact.value }}
</template>
<template v-else-if="fact.target">
<template v-if="fact.target == 'Power'">威力</template>
<template v-else-if="fact.target == 'Toughness'">坚韧</template>
<template v-else-if="fact.target == 'Vitality'">体力</template>
<template v-else-if="fact.target == 'Precision'">精准</template>
<template v-else-if="fact.target == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.target == 'ConditionDamage'">症状伤害</template>
<template v-else-if="fact.target == 'Healing'">治疗效果</template>
<template v-else-if="fact.target == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.target == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.target == ''"></template> : +{{ fact.value }}
</template> 
</div>
</template>
<template v-else-if="fact.type == 'HealingAdjust'">
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : <template v-if="fact.hit_count">{{ fact.hit_count }}次</template>
<template v-else-if="fact.value">{{ fact.value }}</template></div>
</template>
<template v-else-if="fact.type == 'BuffConversion'">
<!--属性转换-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.percent">
基于
<template v-if="fact.source == 'Power'">威力</template>
<template v-else-if="fact.source == 'Toughness'">坚韧</template>
<template v-else-if="fact.source == 'Vitality'">体力</template>
<template v-else-if="fact.source == 'Precision'">精准</template>
<template v-else-if="fact.source == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.source == 'ConditionDamage'">症状伤害</template>
 <template v-else-if="fact.source == 'Healing'">治疗效果</template>
<template v-else-if="fact.source == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.source == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.source == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.source == ''"></template>
<template v-else>属性{{ fact.source }}</template>
获得一定的
<template v-if="fact.target == 'Power'">威力</template>
<template v-else-if="fact.target == 'Toughness'">坚韧</template>
<template v-else-if="fact.target == 'Vitality'">体力</template>
<template v-else-if="fact.target == 'Precision'">精准</template>
<template v-else-if="fact.target == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.target == 'ConditionDamage'">症状伤害</template>
<template v-else-if="fact.target == 'Healing'">治疗效果</template>
<template v-else-if="fact.target == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.target == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.target == ''"></template>
<template v-else>属性{{ fact.target }}</template>
 : {{ fact.percent }}%
</template>
</div>
</template>
<template v-else-if="fact.type == 'Unblockable'">
<!--无法格挡-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">无法格挡</template></div>
</template>
<template v-else-if="fact.type == 'StunBreak'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">解除昏迷</template></div>
</template>
<template v-else-if="fact.type == 'NoData'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span></div>
</template>
<template v-else-if="fact.type == 'ComboFinisher'">
<!--组合终结技-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Blast, Leap, Projectile, Whirl-->
组合终结技 : 
<template v-if="fact.finisher_type == 'Blast'">爆炸</template>
<template v-else-if="fact.finisher_type == 'Leap'">跳跃</template>
<template v-else-if="fact.finisher_type == 'Projectile'">物理投射物</template>
<template v-else-if="fact.finisher_type == 'Whirl'">旋风</template>
<template v-else>{{ fact.finisher_type }}</template>
<template v-if="fact.percent != ''">({{ fact.percent }}%几率)</template>
</div>
</template>
<template v-else-if="fact.type == 'ComboField'">
<!--组合技区域-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Air, Dark, Fire, Ice, Light, Lightning, Poison, Smoke, Ethereal, Water-->
组合技区域 : 
<template v-if="fact.field_type == 'Air'">空气</template>
<template v-else-if="fact.field_type == 'Dark'">黑暗</template>
<template v-else-if="fact.field_type == 'Fire'">火焰</template>
<template v-else-if="fact.field_type == 'Ice'">寒冰</template>
<template v-else-if="fact.field_type == 'Light'">光明</template>
<template v-else-if="fact.field_type == 'Lightning'">闪电</template>
<template v-else-if="fact.field_type == 'Poison'">毒素</template>
<template v-else-if="fact.field_type == 'Smoke'">烟雾</template>
<template v-else-if="fact.field_type == 'Ethereal'">幻光</template>
<template v-else-if="fact.field_type == 'Water'">流水</template>
<template v-else>{{ fact.field_type }}</template>
</div>
</template>
<template v-else>
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">{{ fact.type }}<span v-html="fact.text"></span> : {{ fact.value }}</div>
</template>


</div>
</template>
</div>
		</template>
</div>
</div>
</div>
`
})
}
//specializations
else if(
gw2_type == 'specializations'
){
var app = new Vue({
el: '#app-info',
data:{
specialization: value
},
created: function(){

},
template: `
<div id="app-info">
<div class="gw2-info-box"">
<div class="gw2-info-box-specializations-title">
<p class="gw2-info-box-skills-name">&nbsp;<span v-html="specialization.name"></span></p>
</div>
</div>
</div>
`
});
}
//traits
else if(
gw2_type == 'specializations_traits' ||
gw2_type == 'traits'
){
var app = new Vue({
el: '#app-info',
data:{
trait: value
},
created: function(){
//描述
if( this.trait.description ){
this.trait.description = this.trait.description.replace(/\n/g,"<br/>");
this.trait.description = this.trait.description.replace(/·/g,"&nbsp");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-skills-content">
<p class="gw2-info-box-skills-name"><span v-html="trait.name"></span></p>
<p class="gw2-info-box-skills-description"><span v-html="trait.description"></span></p>
<template v-if="trait.facts != ''">
<div class="gw2-info-box-skills-facts">
<template v-for="fact in trait.facts">
<div :class="'gw2-info-box-skills-fact skills-fact-' + fact.type">
<template v-if="fact.type == 'Range'">
<!--范围-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">范围 : {{ fact.value }}</div>
</template><template v-else-if="fact.type == 'Recharge'">
<!--技能冷却-->
<div class="skills-fact-recharge-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-recharge-word">
<span class="color-Junk">
<template v-if="fact.value == '0.25'">¼</template>
<template v-else-if="fact.value == '0.5'">½</template>
<template v-else-if="fact.value == '0.75'">¾</template>
<template v-else-if="fact.value == '1.25'">1¼</template>
<template v-else-if="fact.value == '1.5'">1½</template>
<template v-else-if="fact.value == '1.75'">1¾</template>
<template v-else-if="fact.value == '2.25'">1¼</template>
<template v-else-if="fact.value == '2.5'">1½</template>
<template v-else-if="fact.value == '2.75'">1¾</template>
<template v-else-if="fact.value == '3.25'">1¼</template>
<template v-else-if="fact.value == '3.5'">1½</template>
<template v-else-if="fact.value == '3.75'">1¾</template>
<template v-else-if="fact.value == '4.25'">1¼</template>
<template v-else-if="fact.value == '4.5'">1½</template>
<template v-else-if="fact.value == '4.75'">1¾</template>
<template v-else-if="fact.value == '5.25'">1¼</template>
<template v-else-if="fact.value == '5.5'">1½</template>
<template v-else-if="fact.value == '5.75'">1¾</template>
<template v-else-if="fact.value == '6.25'">1¼</template>
<template v-else-if="fact.value == '6.5'">1½</template>
<template v-else-if="fact.value == '6.75'">1¾</template>
<template v-else-if="fact.value == '7.25'">1¼</template>
<template v-else-if="fact.value == '7.5'">1½</template>
<template v-else-if="fact.value == '7.75'">1¾</template>
<template v-else-if="fact.value == '8.25'">1¼</template>
<template v-else-if="fact.value == '8.5'">1½</template>
<template v-else-if="fact.value == '8.75'">1¾</template>
<template v-else-if="fact.value == '9.25'">1¼</template>
<template v-else-if="fact.value == '9.5'">1½</template>
<template v-else-if="fact.value == '9.75'">1¾</template>
<template v-else>{{ fact.value }}</template>
</span>
</div>
</template><template v-else-if="fact.type == 'Damage'">
<!--直伤-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.hit_count > 1">
<span v-html="fact.text"></span> : ({{ fact.hit_count }}×)系数 {{ fact.dmg_multiplier }}
</template>
<template v-else>
<span v-html="fact.text"></span> : 系数 {{ fact.dmg_multiplier }}
</template>
</div>
</template><template v-else-if="fact.type == 'Buff'">
<!--BUFF-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.apply_count > 1">
<span class="skills-fact-apply-count">{{ fact.apply_count }}</span>
</template>
<div class="skills-fact-word">
<span v-html="fact.status"></span><template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
<template v-if="fact.apply_count && !fact.description">{{ fact.apply_count }}</template>
</div>
</template><template v-else-if="fact.type == 'PrefixedBuff'">
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.prefix != ''">
<div class="skills-fact-image" :style="'background-image: url(' + fact.prefix.icon + ')'" ></div>
</template>
<div class="skills-fact-word"><span v-html="fact.status"></span><template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
</div>	
</template><template v-else-if="fact.type == 'Number'">
<!--目标数-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.value }}</div>
</template><template v-else-if="fact.type == 'Duration'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template><template v-else-if="fact.type == 'Time'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template><template v-else-if="fact.type == 'Percent'">
<!--百分比-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.percent }}%</div>
</template><template v-else-if="fact.type == 'Distance'">
<!--半径-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.distance }}</div>
</template><template v-else-if="fact.type == 'AttributeAdjust'">
<!--技能调整-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.text"><span v-html="fact.text"></span> : {{ fact.value }}
</template><template v-else-if="fact.target">
<template v-if="fact.target == 'Power'">威力
</template><template v-else-if="fact.target == 'Toughness'">坚韧
</template><template v-else-if="fact.target == 'Vitality'">体力
</template><template v-else-if="fact.target == 'Precision'">精准
</template><template v-else-if="fact.target == 'CritDamage'">暴击效果
</template><template v-else-if="fact.target == 'ConditionDamage'">症状伤害
</template><template v-else-if="fact.target == 'Healing'">治疗效果
</template><template v-else-if="fact.target == 'ConditionDuration'">症状效果
</template><template v-else-if="fact.target == 'BoonDuration'">增益效果
</template><template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性
</template><template v-else-if="fact.target == ''">
</template> : +{{ fact.value }}
</template> 
</div>
</template><template v-else-if="fact.type == 'BuffConversion'">
<!--属性转换-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.percent">
基于
<template v-if="fact.source == 'Power'">威力
</template><template v-else-if="fact.source == 'Toughness'">坚韧
</template><template v-else-if="fact.source == 'Vitality'">体力
</template><template v-else-if="fact.source == 'Precision'">精准
</template><template v-else-if="fact.source == 'CritDamage'">暴击效果
</template><template v-else-if="fact.source == 'ConditionDamage'">症状伤害
</template><template v-else-if="fact.source == 'Healing'">治疗效果
</template><template v-else-if="fact.source == 'ConditionDuration'">症状效果
</template><template v-else-if="fact.source == 'BoonDuration'">增益效果
</template><template v-else-if="fact.source == 'AgonyResistance'">痛苦抗性
</template><template v-else-if="fact.source == ''">
</template>
<template v-else>
属性{{ fact.source }}
</template>
获得一定的
<template v-if="fact.target == 'Power'">威力
</template><template v-else-if="fact.target == 'Toughness'">坚韧
</template><template v-else-if="fact.target == 'Vitality'">体力
</template><template v-else-if="fact.target == 'Precision'">精准
</template><template v-else-if="fact.target == 'CritDamage'">暴击效果
</template><template v-else-if="fact.target == 'ConditionDamage'">症状伤害
</template><template v-else-if="fact.target == 'Healing'">治疗效果
</template><template v-else-if="fact.target == 'ConditionDuration'">症状效果
</template><template v-else-if="fact.target == 'BoonDuration'">增益效果
</template><template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性
</template><template v-else-if="fact.target == ''">
</template>
<template v-else>
属性{{ fact.target }}
</template>
: {{ fact.percent }}%
</template>
</div>
</template><template v-else-if="fact.type == 'Unblockable'">
<!--无法格挡-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">无法格挡</template></div>
</template><template v-else-if="fact.type == 'StunBreak'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">解除昏迷</template></div>
</template><template v-else-if="fact.type == 'NoData'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span></div>
</template><template v-else-if="fact.type == 'ComboFinisher'">
<!--组合终结技-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Blast, Leap, Projectile, Whirl-->
组合终结技 : 
<template v-if="fact.finisher_type == 'Blast'">爆炸
</template><template v-else-if="fact.finisher_type == 'Leap'">跳跃
</template><template v-else-if="fact.finisher_type == 'Projectile'">物理投射物
</template><template v-else-if="fact.finisher_type == 'Whirl'">旋风
</template>
<template v-else>{{ fact.finisher_type }}</template>
<template v-if="fact.percent != ''">({{ fact.percent }}%几率)</template>
</div>
</template><template v-else-if="fact.type == 'ComboField'">
<!--组合技区域-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Air, Dark, Fire, Ice, Light, Lightning, Poison, Smoke, Ethereal, Water-->
组合技区域 : 
<template v-if="fact.field_type == 'Air'">空气
</template><template v-else-if="fact.field_type == 'Dark'">黑暗
</template><template v-else-if="fact.field_type == 'Fire'">火焰
</template><template v-else-if="fact.field_type == 'Ice'">寒冰
</template><template v-else-if="fact.field_type == 'Light'">光明
</template><template v-else-if="fact.field_type == 'Lightning'">闪电
</template><template v-else-if="fact.field_type == 'Poison'">毒素
</template><template v-else-if="fact.field_type == 'Smoke'">烟雾
</template><template v-else-if="fact.field_type == 'Ethereal'">Ethereal
</template><template v-else-if="fact.field_type == 'Water'">流水
</template>
<template v-else>{{ fact.field_type }}</template>

</div>
</template>
<template v-else>
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">{{ fact.type }}<span v-html="fact.text"></span> : {{ fact.value }}</div>
</template>
</div>
</template>
</div>
</template>
</div>
</div>

<template v-if="trait.skills">
<template v-for="(skill,index) in trait.skills">
<template v-if="index == 0">
<div class="gw2-info-box">
<div class="gw2-info-box-skills-content">
<p class="gw2-info-box-skills-name"><span v-html="skill.name"></span><!-- ( ID : {{ skill.id }} ) --></p>
<p class="gw2-info-box-skills-description"><span v-html="skill.description"></span></p>
<template v-if="skill.facts != ''">
<div class="gw2-info-box-skills-facts">
<template v-for="fact in skill.facts">
<div :class="'gw2-info-box-skills-fact skills-fact-' + fact.type">
<template v-if="fact.type == 'Range'">
<!--范围-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">范围 : {{ fact.value }}</div>
</template>
<template v-else-if="fact.type == 'Recharge'">
<!--技能冷却-->
<div class="skills-fact-recharge-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-recharge-word">
<template v-if="fact.value == '0.25'">¼</template>
<template v-else-if="fact.value == '0.5'">½</template>
<template v-else-if="fact.value == '0.75'">¾</template>
<template v-else-if="fact.value == '1.25'">1¼</template>
<template v-else-if="fact.value == '1.5'">1½</template>
<template v-else-if="fact.value == '1.75'">1¾</template>
<template v-else-if="fact.value == '2.25'">1¼</template>
<template v-else-if="fact.value == '2.5'">1½</template>
<template v-else-if="fact.value == '2.75'">1¾</template>
<template v-else-if="fact.value == '3.25'">1¼</template>
<template v-else-if="fact.value == '3.5'">1½</template>
<template v-else-if="fact.value == '3.75'">1¾</template>
<template v-else-if="fact.value == '4.25'">1¼</template>
<template v-else-if="fact.value == '4.5'">1½</template>
<template v-else-if="fact.value == '4.75'">1¾</template>
<template v-else-if="fact.value == '5.25'">1¼</template>
<template v-else-if="fact.value == '5.5'">1½</template>
<template v-else-if="fact.value == '5.75'">1¾</template>
<template v-else-if="fact.value == '6.25'">1¼</template>
<template v-else-if="fact.value == '6.5'">1½</template>
<template v-else-if="fact.value == '6.75'">1¾</template>
<template v-else-if="fact.value == '7.25'">1¼</template>
<template v-else-if="fact.value == '7.5'">1½</template>
<template v-else-if="fact.value == '7.75'">1¾</template>
<template v-else-if="fact.value == '8.25'">1¼</template>
<template v-else-if="fact.value == '8.5'">1½</template>
<template v-else-if="fact.value == '8.75'">1¾</template>
<template v-else-if="fact.value == '9.25'">1¼</template>
<template v-else-if="fact.value == '9.5'">1½</template>
<template v-else-if="fact.value == '9.75'">1¾</template>
<template v-else>{{ fact.value }}</template>
</div>
</template>
<template v-else-if="fact.type == 'Damage'">
<!--直伤-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.hit_count > 1">
<span v-html="fact.text"></span> : ({{ fact.hit_count }}×)系数 {{ fact.dmg_multiplier }}
</template>
<template v-else>
<span v-html="fact.text"></span> : 系数 {{ fact.dmg_multiplier }}
</template>
</div>
</template>
<template v-else-if="fact.type == 'Buff'">
<!--BUFF-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.apply_count > 1">
<span class="skills-fact-apply-count">{{ fact.apply_count }}</span>
</template>
<div class="skills-fact-word">
<span v-html="fact.status"></span>
<template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
<template v-if="fact.apply_count && !fact.description">{{ fact.apply_count }}</template>
</div>
</template>
<template v-else-if="fact.type == 'PrefixedBuff'">
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<template v-if="fact.prefix != ''">
<div class="skills-fact-image" :style="'background-image: url(' + fact.prefix.icon + ')'" ></div>
</template>
<div class="skills-fact-word"><span v-html="fact.status"></span><template v-if="fact.duration != ''">({{ fact.duration }}秒)</template> : <span v-html="fact.description"></span>
</div>
</template>

<template v-else-if="fact.type == 'Number'">
<!--目标数-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.value }}</div>
</template>
<template v-else-if="fact.type == 'Duration'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template>
<template v-else-if="fact.type == 'Time'">
<!--持续时间-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.duration }}秒</div>
</template>
<template v-else-if="fact.type == 'Percent'">
<!--百分比-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : <template v-if="fact.percent">{{ fact.percent }}%</template>
<template v-else-if="fact.value">{{ fact.value }}</template></div>
</template>
<template v-else-if="fact.type == 'Distance'">
<!--半径-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.distance }}</div>
</template>
<template v-else-if="fact.type == 'Radius'">
<!--半径-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : {{ fact.distance }}</div>
</template>
<template v-else-if="fact.type == 'AttributeAdjust'">
<!--技能调整-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.text">
<span v-html="fact.text"></span> : {{ fact.value }}
</template>
<template v-else-if="fact.target">
<template v-if="fact.target == 'Power'">威力</template>
<template v-else-if="fact.target == 'Toughness'">坚韧</template>
<template v-else-if="fact.target == 'Vitality'">体力</template>
<template v-else-if="fact.target == 'Precision'">精准</template>
<template v-else-if="fact.target == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.target == 'ConditionDamage'">症状伤害</template>
<template v-else-if="fact.target == 'Healing'">治疗效果</template>
<template v-else-if="fact.target == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.target == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.target == ''"></template> : +{{ fact.value }}
</template> 
</div>
</template>
<template v-else-if="fact.type == 'HealingAdjust'">
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span> : <template v-if="fact.hit_count">{{ fact.hit_count }}次</template>
<template v-else-if="fact.value">{{ fact.value }}</template></div>
</template>
<template v-else-if="fact.type == 'BuffConversion'">
<!--属性转换-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<template v-if="fact.percent">
基于
<template v-if="fact.source == 'Power'">威力</template>
<template v-else-if="fact.source == 'Toughness'">坚韧</template>
<template v-else-if="fact.source == 'Vitality'">体力</template>
<template v-else-if="fact.source == 'Precision'">精准</template>
<template v-else-if="fact.source == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.source == 'ConditionDamage'">症状伤害</template>
 <template v-else-if="fact.source == 'Healing'">治疗效果</template>
<template v-else-if="fact.source == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.source == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.source == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.source == ''"></template>
<template v-else>属性{{ fact.source }}</template>
获得一定的
<template v-if="fact.target == 'Power'">威力</template>
<template v-else-if="fact.target == 'Toughness'">坚韧</template>
<template v-else-if="fact.target == 'Vitality'">体力</template>
<template v-else-if="fact.target == 'Precision'">精准</template>
<template v-else-if="fact.target == 'CritDamage'">暴击效果</template>
<template v-else-if="fact.target == 'ConditionDamage'">症状伤害</template>
<template v-else-if="fact.target == 'Healing'">治疗效果</template>
<template v-else-if="fact.target == 'ConditionDuration'">症状效果</template>
<template v-else-if="fact.target == 'BoonDuration'">增益效果</template>
<template v-else-if="fact.target == 'AgonyResistance'">痛苦抗性</template>
<template v-else-if="fact.target == ''"></template>
<template v-else>属性{{ fact.target }}</template>
 : {{ fact.percent }}%
</template>
</div>
</template>
<template v-else-if="fact.type == 'Unblockable'">
<!--无法格挡-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">无法格挡</template></div>
</template>
<template v-else-if="fact.type == 'StunBreak'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><template v-if="fact.value == true">解除昏迷</template></div>
</template>
<template v-else-if="fact.type == 'NoData'">
<!--解除昏迷-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word"><span v-html="fact.text"></span></div>
</template>
<template v-else-if="fact.type == 'ComboFinisher'">
<!--组合终结技-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Blast, Leap, Projectile, Whirl-->
组合终结技 : 
<template v-if="fact.finisher_type == 'Blast'">爆炸</template>
<template v-else-if="fact.finisher_type == 'Leap'">跳跃</template>
<template v-else-if="fact.finisher_type == 'Projectile'">物理投射物</template>
<template v-else-if="fact.finisher_type == 'Whirl'">旋风</template>
<template v-else>{{ fact.finisher_type }}</template>
<template v-if="fact.percent != ''">({{ fact.percent }}%几率)</template>
</div>
</template>
<template v-else-if="fact.type == 'ComboField'">
<!--组合技区域-->
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">
<!--Air, Dark, Fire, Ice, Light, Lightning, Poison, Smoke, Ethereal, Water-->
组合技区域 : 
<template v-if="fact.field_type == 'Air'">空气</template>
<template v-else-if="fact.field_type == 'Dark'">黑暗</template>
<template v-else-if="fact.field_type == 'Fire'">火焰</template>
<template v-else-if="fact.field_type == 'Ice'">寒冰</template>
<template v-else-if="fact.field_type == 'Light'">光明</template>
<template v-else-if="fact.field_type == 'Lightning'">闪电</template>
<template v-else-if="fact.field_type == 'Poison'">毒素</template>
<template v-else-if="fact.field_type == 'Smoke'">烟雾</template>
<template v-else-if="fact.field_type == 'Ethereal'">幻光</template>
<template v-else-if="fact.field_type == 'Water'">流水</template>
<template v-else>{{ fact.field_type }}</template>
</div>
</template>
<template v-else>
<div class="skills-fact-image" :style="'background-image: url(' + fact.icon + ')'" ></div>
<div class="skills-fact-word">{{ fact.type }}<span v-html="fact.text"></span> : {{ fact.value }}</div>
</template>


</div>
</template>
</div>
</template>
</div>
</div>
</template>
</template>
</template>
</div>
`
});
}
//pets
else if(
gw2_type == 'pets'
){
var app = new Vue({
el: '#app-info',
data:{
pet: value
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<span class="gw2-info-box-currencies-name color-Exotic"><span v-html="pet.name"></span></span>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk"><span v-html="pet.description"></span></span>
</div>
</div>
</div>
</div>
</div>`
});
}

//PVP
else if(
gw2_type == 'pvp_weapons'
){
var app = new Vue({
el: '#app-info',
data:{
pvp_weapon: value
},
template: `
<div id="app-info">
<div class="gw2-info-box"">
<div class="gw2-info-box-pvp_weapons-title">
<span class="gw2-info-box-pvp_weapons-name"><span v-html="pvp_weapon.name"></span></span>
</div>
</div>
</div>`
});
}
else if(
gw2_type == 'pvp_amulets'
){
var app = new Vue({
el: '#app-info',
data:{
pvp_amulet: value
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-items-title">
<div class="gw2-info-box-items-icon" :style="'background-image: url(' + pvp_amulet.icon + ')'" ></div>
<span class="gw2-info-box-items-name"><span v-html="pvp_amulet.name"></span></span>
</div>
<div class="gw2-info-box-items-rows">
<template v-if="pvp_amulet.attributes">
<template v-if="pvp_amulet.attributes.Power"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.Power }} 威力</div></template>
<template v-if="pvp_amulet.attributes.Toughness"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.Toughness }} 坚韧</div></template>
<template v-if="pvp_amulet.attributes.Vitality"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.Vitality }} 体力</div></template>
<template v-if="pvp_amulet.attributes.Precision"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.Precision }} 精准</div></template>
<template v-if="pvp_amulet.attributes.CritDamage"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.CritDamage }} 暴击效果</div></template>
<template v-if="pvp_amulet.attributes.ConditionDamage"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.ConditionDamage }} 症状伤害</div></template>
<template v-if="pvp_amulet.attributes.Healing"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.Healing }} 治疗效果</div></template>
<template v-if="pvp_amulet.attributes.ConditionDuration"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.ConditionDuration }} 症状效果</div></template>
<template v-if="pvp_amulet.attributes.BoonDuration"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.BoonDuration }} 增益效果</div></template>
<template v-if="pvp_amulet.attributes.AgonyResistance"><div class="gw2-info-box-items-row">+{{ pvp_amulet.attributes.AgonyResistance }} 痛苦抗性</div></template>
</template>
</div>
</div>
</div>
</div>`
});
}
else if(
gw2_type == 'pvp_sigils'
){
var app = new Vue({
el: '#app-info',
data:{
pvp_sigil: value
},
created: function(){
//描述
if( this.pvp_sigil.description ){
this.pvp_sigil.description = this.pvp_sigil.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-items-title">
<div class="gw2-info-box-items-icon" :style="'background-image: url(' + pvp_sigil.icon + ')'"></div>
<span class="gw2-info-box-items-name gw2-info-Exotic"><span v-html="pvp_sigil.name"></span>(PvP)</span>
</div>
<div class="gw2-info-box-items-rows">
<!--描述-->	
<template v-if="pvp_sigil.description">
<div class="gw2-info-box-items-row gw2-info-Fine">
<span v-html="pvp_sigil.description"></span>
</div>
</template>
</div>
</div>
</div>
</div>`
});
}
else if(
gw2_type == 'pvp_runes'
){
var app = new Vue({
el: '#app-info',
data:{
pvp_rune: value
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-items-title">
<div class="gw2-info-box-items-icon" :style="'background-image: url(' + pvp_rune.icon + ')'" ></div>
<span class="gw2-info-box-items-name gw2-info-Exotic"><span v-html="pvp_rune.name"></span></span>
</div>
<div class="gw2-info-box-items-rows">
<!--属性描述-->
<template v-if="pvp_rune.details.bonuses">
<template v-for="(bonuse,index) in pvp_rune.details.bonuses">
<div class="gw2-info-box-items-row">
<span class="gw2-info-Fine">
({{ index + 1 }})<span v-html="bonuse"></span>
</span>
</div>
</template>
</template>
</div>
</div>
</div>
</div>`
});
}

//professions_icon
else if(
gw2_type == 'professions_icon'
){
var app = new Vue({
el: '#app-info',
data:{
profession_icon: value
},
created: function(){
//描述
if( this.profession_icon.description ){
this.profession_icon.description = this.profession_icon.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<p class="gw2-info-box-skills-name"><span v-html="profession_icon.name"></span></p>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="profession_icon.description"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}


//raid_boss
else if(
gw2_type == 'raid_boss'
){
var app = new Vue({
el: '#app-info',
data:{
raid_boss: value
},
created: function(){
//描述
if( this.raid_boss.description ){
this.raid_boss.description = this.raid_boss.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<p class="gw2-info-box-skills-name"><span v-html="raid_boss.name"></span></p>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="raid_boss.description"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}


//副本
else if(
gw2_type == 'mistlock_instability'
){
var app = new Vue({
el: '#app-info',
data:{
	mistlock_instability: value
},
created: function(){
//描述
if( this.mistlock_instability.description ){
this.mistlock_instability.description = this.mistlock_instability.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<p class="gw2-info-box-skills-name"><span v-html="mistlock_instability.name"></span></p>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="mistlock_instability.description"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}



//skills_icon
else if(
gw2_type == 'skills_icon'
){
var app = new Vue({
el: '#app-info',
data:{
skill_icon: value
},
created: function(){
//描述
if( this.skill_icon.description ){
this.skill_icon.description = this.skill_icon.description.replace(/\n/g,"<br/>");
} 
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<p class="gw2-info-box-skills-name"><span v-html="skill_icon.name"></span></p>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="skill_icon.description"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}

//currencies
else if(
gw2_type == 'currencies'
){
var app = new Vue({
el: '#app-info',
data:{
currency: value
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-currencies-title">
<span class="gw2-info-box-currencies-name color-Exotic"><span v-html="currency.name"></span></span>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="currency.description"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}

//skins
else if(
gw2_type == 'skins'
){
var app = new Vue({
el: '#app-info',
data:{
skin: value
},
template: `<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-items-title">
<div class="gw2-info-box-items-icon" :style="'background-image: url(' + skin.icon + ')'" ></div>
<span class="gw2-info-box-items-name gw2-info-Basic">皮肤：<span v-html="skin.name"></span></span>
</div>
</div>
</div>                
</div>`
});
}


//achievements
else if(
gw2_type == 'achievements'
){
var app = new Vue({
el: '#app-info',
data:{
achievement: value
},
template: `
<div id="app-info">
<div class="gw2-info-box">
<div class="gw2-info-box-items-content">
<div class="gw2-info-box-achievements-title">
<span class="gw2-info-box-achievements-name color-Exotic"><span v-html="achievement.name"></span></span>
</div>
<div class="gw2-info-box-items-rows">
<div class="gw2-info-box-items-row">
<span class="color-Junk">
<span v-html="achievement.requirement"></span>
</span>
</div>
</div>
</div>
</div>
</div>`
});
}

//colors

//minis
else if(
gw2_type == 'minis'
){
var app = new Vue({
el: '#app-info',
data:{
mini: value
},
template: `
<div id="app-info">
<div class="gw2-info-box"">
<div class="gw2-info-box-minis-title">
<span class="gw2-info-box-minis-name"><span v-html="mini.name"></span></span>
</div>
</div>
</div>`
});
}


},function(){
$('#tooltip-info').html(`<div id="app-info"></div>`);
});

//特性自动隐藏非相关
$('.build-info-content .mini-traits').hover(function(){
		$('.specializations-box .gw2-info-trait-Minor,.specializations-box .gw2-info-trait-Major').addClass('onmouse-trait');
var this_ids = $(this).find('.gw2-info').attr('gw2-ids');
$('.specializations-box .gw2-info-trait-Minor[id=specializations_traits_' + this_ids +'],.specializations-box .gw2-info-trait-Major[id=specializations_traits_' + this_ids + ']').removeClass('onmouse-trait').addClass('onmouse-highlight-trait');
},function(){
$('.specializations-box .gw2-info-trait-Minor,.specializations-box .gw2-info-trait-Major').removeClass('onmouse-trait').removeClass('onmouse-highlight-trait');
});

});

};


/*
说明：
<div class="main-search-list-image gw2-tooltip gw2-info" gw2-type="items" gw2-ids="{{ item.id }}">
.gw2-tooltip决定是否显示弹出层
.gw2-info 决定是否回执gw2-info的返回信息

option:gw2-type 表明所属信息种类
option:gw2-ids所属信息id序列

 */
