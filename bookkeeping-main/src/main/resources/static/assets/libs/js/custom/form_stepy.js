$(function() {

    // Override defaults
    $.fn.stepy.defaults.legend = false;
    $.fn.stepy.defaults.transition = 'fade';
    $.fn.stepy.defaults.duration = 150;
    $.fn.stepy.defaults.backLabel = '<i class="icon-arrow-left13 position-left"></i> Back';
    $.fn.stepy.defaults.nextLabel = 'Next <i class="icon-arrow-right14 position-right"></i>';
    
    // Wizard examples
    // ------------------------------

    // Basic wizard setup
    $(".stepy-basic").stepy();


    // Hide step description
    $(".stepy-no-description").stepy({
        description: false
    });


    // Clickable titles
    $(".stepy-clickable").stepy({
        titleClick: true
    });


    // Stepy callbacks
    $(".stepy-callbacks").stepy({
        next: function(index) {
            alert('Going to step: ' + index);
        },
        back: function(index) {
            alert('Returning to step: ' + index);
        },
        finish: function() {
            alert('Submit canceled.');
            return false;
        }
    });
	
	// Initialize plugins
    // ------------------------------

    // Apply "Back" and "Next" button styling
    $('.stepy-step').find('.button-next').addClass('btn btn-primary');
    $('.stepy-step').find('.button-back').addClass('btn btn-default');


    // Select2 selects
    $('.select').select2();


    // Simple select without search
    $('.select-simple').select2({
        minimumResultsForSearch: '-1'
    });


    // Styled checkboxes and radios
    $('.styled').uniform({
        radioClass: 'choice'
    });

    // Styled file input
    $('.file-styled').uniform({
        wrapperClass: 'bg-warning',
        fileButtonHtml: '<i class="icon-googleplus5"></i>'
    });
    
});
//stepy form with ajax submit and loading modal
function stepyAjaxToModal(formId, modalId){
	$(formId).stepy({
		legend: false,
		validate: true,
        block: true,
        next: function(index) {
            if (!$(formId).validate(validate)) {
                return false;
            }
        },
	    back: function(index) {
	    },
	    finish: function() {
	    	if (!$(formId).validate(validate)) {
	            return false;
	        }
	    	blockPage();
	    	$.ajax({
	    		url : $(formId).attr("action"),
	    		data :  $(formId).serialize(),
	    		type : "POST",
	    		success : function(data) {
	    			unblockPage();
	        		$(modalId).find('.modal-body').html(data);
	        		$(modalId).modal('show');
	    		},
	    		error: function (request, status, error) {
	    			unblockPage();
	    			swal({title: "Operation Failed!", text: error, type: "error", timer: 5000, confirmButtonColor: "#43ABDB"});
	    	    }
	    	});
	        return false;
	    }
	});


	//Initialize validation
	var validate = {
	    ignore: 'input[type=hidden], .select2-input',
	    errorClass: 'validation-error-label',
	    successClass: 'validation-valid-label',
	    highlight: function(element, errorClass) {
	        $(element).removeClass(errorClass);
	    },
	    unhighlight: function(element, errorClass) {
	        $(element).removeClass(errorClass);
	    },
	    errorPlacement: function(error, element) {
	        if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container') ) {
	            if(element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
	                error.appendTo( element.parent().parent().parent().parent() );
	            }
	             else {
	                error.appendTo( element.parent().parent().parent().parent().parent() );
	            }
	        }
	        else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
	            error.appendTo( element.parent().parent().parent() );
	        }
	        else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
	            error.appendTo( element.parent().parent() );
	        }
	        else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
	            error.appendTo( element.parent().parent() );
	        }
	        else {
	            error.insertAfter(element);
	        }
	    },
	    rules: {
	        email: {
	            email: true
	        }
	    }
	}
}