'use strict'

export const clearModal = {
  methods: {
    clearModal() {
      $('.modal').on('hidden.bs.modal', function() {
        $(this).find("input,textarea,select").val('');
      })
    }
  }
}