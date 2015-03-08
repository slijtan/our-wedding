class AddCommentToRsvps < ActiveRecord::Migration
  def change
    add_column :rsvps, :comment, :text, :after => :guest_list
  end
end
