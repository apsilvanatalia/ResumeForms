function applyMasks() {
    $('#phone').mask('(00) 0 0000-0000');
    $('#state').mask('AA', {
        translation: {
            'A': { pattern: /[a-zA-Z]/ }
        }
    });
    $('#state').on('input', function() {
        $(this).val(function(_, val) {
            return val.toUpperCase();
        });
    });
}