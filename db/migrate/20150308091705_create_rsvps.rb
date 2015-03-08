class CreateRsvps < ActiveRecord::Migration
  def change
    create_table :rsvps do |t|
      t.string :full_name
      t.boolean :is_coming
      t.string :guest_list

      t.timestamps null: false
    end
  end
end
