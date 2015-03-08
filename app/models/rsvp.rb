class Rsvp < ActiveRecord::Base
  validates_presence_of :full_name
  validates_inclusion_of :is_coming, :in => [true, false]
end
