# Compatibility shims for older Jekyll/Liquid versions on modern Ruby.
unless "".respond_to?(:tainted?)
  class Object
    def taint
      self
    end

    def tainted?
      false
    end

    def untaint
      self
    end
  end
end
