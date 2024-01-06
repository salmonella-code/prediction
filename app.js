let genderStatus = false;
async function getGender() {
    await $.get("https://api.genderize.io?name="+ $('#firstName').val() +"&country_id=ID", function(data, status){
        if (status == "success") {
            let genderDecode;

            if (data.gender == "female") {
                genderDecode = "perempuan";
            } else {
                genderDecode = "laki-laki"
            }

            const probabilityPercentage = data.probability * 100;
            const result = `Hello, ${data.name}. Kemungkinan ${probabilityPercentage}% jenis kelamin anda adalah ${genderDecode}`

            $('#resultGender').html(result)
            genderStatus = true;
        }
    });
}

let ageStatus = false;
async function getAge() {
    await $.get("https://api.agify.io?name="+ $('#firstName').val() +"&country_id=ID", function(data, status){
        if (status == "success") {
            const result = `Saat ini anda berusia ${data.age} tahun.`

            $('#resultAge').html(result)
            ageStatus = true;
        }
    });
}

let nationalityStatus = false;
async function getNationality() {
    await $.get("https://api.nationalize.io?name="+ $('#firstName').val(), function(data, status){
        if (status == "success") {
            let result = `Kemungkinan kewarganegaraan anda sebagai berikut: <br>`
            let listCountry = "";
            $.each(data.country, function( key, value ) {
                if (value != "undefined") {
                    const probabilityPercentage = parseFloat(value.probability * 100).toFixed(2);
    
                    listCountry += `<li>Negara ${value.country_id}, tingkat probabilitas: ${probabilityPercentage}%</li>`
                }
            });
            $('#spinerNationality').remove();
            $('#openerCountry').html(result);
            $('#listCountry').html(listCountry);

            nationalityStatus = true;
        }
    });
}

$(document).ready(function(){
    new TypeIt("#oppener", {
        speed: 160,
        loop: true,
    })
    .type("Sini Aku Ramal", {delay: 80})
    .move(null, { to: "END" })
    .delete(14)
    .type("Maaf Klo salah :D", {delay: 80})
    .go()

    $('.btn-search').click(function(){
        $('.btn-search').html('<i class="fa-solid fa-spin fa-spinner"></i>');
        $('.btn-search').attr('disabled', true);
        $('#result').removeClass('d-none');

        getGender()
        getAge()
        getNationality()
        setInterval(() => {
            if (genderStatus == true && ageStatus == true && nationalityStatus == true) {
                $('.btn-search').attr('disabled', false);
                $('.btn-search').html('<i class="fas fa-search"></i>');
            }
        }, 1000);
    })
})