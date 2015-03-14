class HomeController < ApplicationController

  def index
  end

  def index2
    @debug = params.fetch(:debug, false)

    @rsvp = Rsvp.new
  end

  def save_rsvp
    @rsvp = Rsvp.new(rsvp_params)

    if @rsvp.save
      render :js => %{
        $('#rsvp-form').slideUp();
        $('#rsvp-success').slideDown();
      }
    else
      highlight_errors_js = "$('#new_rsvp input').removeClass('error');"
      highlight_errors_js << "$('#new_rsvp label').removeClass('error');"

      @rsvp.errors.each do |error|
        highlight_errors_js << "$('input[name=\"rsvp[" << error.to_s << "]\"').addClass('error');"
        highlight_errors_js << "$('input[name=\"rsvp[" << error.to_s << "]\"').prev().addClass('error');"
      end

      render :js => highlight_errors_js
    end
  end

  private

  def rsvp_params
    params.require(:rsvp).permit(:full_name, :is_coming, :guest_list, :comment)
  end

end
