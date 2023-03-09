class ReviewsController < ApplicationController
  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @review = Review.new(review_params)
    @review.restaurant = @restaurant

    respond_to do |format|
      # raise
      if @review.save
        format.html { redirect_to restaurant_path(@restaurant) }
        format.json # Follow the classic Rails flow and look for a "create.json" view
      else
        format.html { render "restaurants/show", status: :unprocessable_entity }
        format.json # Follow the classic Rails flow and look for a "create.json" view
      end
    end
  end

  private

  def review_params
    params.require(:review).permit(:content)
  end
end

# The "respond_to" is referencing the response that will be sent to the View (which is going to the browser).
# By passing in a "format" paramater in the block.
# Sent from the controller to the view whenever a browser makes a request for html or json data.
